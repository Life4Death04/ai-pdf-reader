/**
 * Page-Level Filtering Module
 * 
 * Filters out non-meaningful pages/sections from PDF text before chunking.
 * This prevents TTS from narrating navigation elements like table of contents,
 * indexes, references, and other metadata that aren't part of the main content.
 */

// ═══════════════════════════════════════════════════════════════════════════
// PAGE SPLITTING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Splits merged PDF text into logical "pages" or sections.
 * 
 * STRATEGY:
 * Since unpdf merges all pages, we simulate page boundaries by splitting on:
 * 1. Multiple consecutive blank lines (often indicates page/section breaks)
 * 2. Common section headers (CHAPTER, REFERENCES, etc.)
 * 
 * WHY: We need page-level granularity to filter out ToC, Index, References
 * sections that span multiple logical pages but are useless for audio.
 * 
 * @param text - Cleaned text from PDF extraction
 * @returns Array of text sections representing logical pages
 */
export function splitIntoPages(text: string): string[] {
  console.log("[splitIntoPages] Starting page splitting...");
  console.log(`[splitIntoPages] Input text length: ${text.length} chars`);
  console.log(`[splitIntoPages] First 300 chars: ${text.slice(0, 300)}`);
  console.log(`[splitIntoPages] Checking for \\n\\n sequences...`);
  
  // Count how many \n\n sequences exist
  const doubleNewlineCount = (text.match(/\n\n/g) || []).length;
  console.log(`[splitIntoPages] Found ${doubleNewlineCount} double-newline sequences`);
  
  // Split on 2+ blank lines (common page break indicator in PDFs)
  let sections = text.split(/\n\n+/);
  console.log(`[splitIntoPages] After first split: ${sections.length} sections`);
  
  // If we got very few sections (text has few paragraph breaks), use fallback
  // Split by approximate page size (10000 chars ≈ 2500 words ≈ 10 pages)
  if (sections.length < 3 && text.length > 10000) {
    console.log(`[splitIntoPages] WARNING: Too few sections (${sections.length}), using character-based fallback`);
    sections = [];
    const chunkSize = 10000;
    for (let i = 0; i < text.length; i += chunkSize) {
      sections.push(text.slice(i, i + chunkSize));
    }
    console.log(`[splitIntoPages] Fallback created ${sections.length} sections`);
  }
  
  // Further split on section headers (all-caps lines that look like titles)
  const pages: string[] = [];
  for (const section of sections) {
    // Split before lines that are all caps and likely section headers
    // Pattern: Line with 3+ uppercase words (e.g., "TABLE OF CONTENTS")
    const parts = section.split(/\n(?=[A-Z][A-Z\s]{3,}\n)/);
    pages.push(...parts);
  }
  
  console.log(`[splitIntoPages] After section header split: ${pages.length} sections`);

  // Filter out empty sections
  const nonEmpty = pages.filter(p => p.trim().length > 0);
  
  console.log(`[splitIntoPages] After filtering empty: ${nonEmpty.length} sections`);
  
  // Log sample of first few sections
  if (nonEmpty.length > 0) {
    console.log(`[splitIntoPages] First section preview (200 chars): ${nonEmpty[0].slice(0, 200)}...`);
  }
  
  console.log(`[splitIntoPages] Split into ${nonEmpty.length} sections`);
  return nonEmpty;
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE-LEVEL FILTERING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Determines if a page/section contains meaningful narrative content.
 * 
 * REJECTS pages that are:
 * - Too short (< 50 words) - likely headers, footers, or formatting artifacts
 * - Navigation sections (ToC, Index, References, Bibliography)
 * - Mostly structured data (tables of numbers, code listings)
 * 
 * ACCEPTS pages with:
 * - Sufficient word count (50+ words)
 * - High alphabetic character ratio (natural language)
 * - No navigation keywords in prominent positions
 * 
 * WHY: These sections are reader navigation aids that sound terrible in audio.
 * "Table of Contents... Chapter One... Page Three..." is not content.
 * 
 * @param text - Text from a single page/section
 * @returns true if page should be kept, false if it should be discarded
 */
export function isUsefulPage(text: string): boolean {
  const trimmed = text.trim();
  
  // ───────────────────────────────────────────────────────────────────────────
  // Filter 1: Minimum Word Count (50 words)
  // ───────────────────────────────────────────────────────────────────────────
  const wordCount = countWords(trimmed);
  if (wordCount < 50) {
    console.log(`[isUsefulPage] ❌ REJECT - Too few words (${wordCount}/50)`);
    return false;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Filter 2: Navigation Section Detection (Keywords)
  // ───────────────────────────────────────────────────────────────────────────
  const lowerText = trimmed.toLowerCase();
  
  // Keywords that indicate non-content sections
  const navigationKeywords = [
    "table of contents",
    "contents",
    "index",
    "references",
    "bibliography",
    "works cited",
    "appendix",
    "acknowledgments",
    "acknowledgements",
    "copyright notice",
    "all rights reserved",
    "isbn",
    "preface",
    "foreword",
    "about the author",
    "about this book",
  ];

  // Check if keyword appears in first 200 characters (likely a section title)
  const preview = lowerText.slice(0, 200);
  for (const keyword of navigationKeywords) {
    if (preview.includes(keyword)) {
      console.log(`[isUsefulPage] ❌ REJECT - Navigation keyword: "${keyword}"`);
      return false;
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Filter 3: Alphanumeric Ratio (Natural Language Check)
  // ───────────────────────────────────────────────────────────────────────────
  // If less than 60% of characters are letters, it's likely a table or code
  const alphaCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const totalChars = trimmed.length;
  const alphaRatio = alphaCount / totalChars;

  if (alphaRatio < 0.6) {
    console.log(`[isUsefulPage] ❌ REJECT - Low alpha ratio (${(alphaRatio * 100).toFixed(1)}% < 60%)`);
    return false;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Filter 4: Excessive Repetition Check (Headers/Footers)
  // ───────────────────────────────────────────────────────────────────────────
  // If the same line appears 3+ times, it's likely a repeated header/footer
  const lines = trimmed.split("\n").map(l => l.trim());
  const lineCounts = new Map<string, number>();
  
  for (const line of lines) {
    if (line.length > 10) { // Only check substantial lines
      lineCounts.set(line, (lineCounts.get(line) || 0) + 1);
    }
  }
  
  for (const [line, count] of lineCounts.entries()) {
    if (count >= 3) {
      const preview = line.length > 50 ? line.slice(0, 50) + "..." : line;
      console.log(`[isUsefulPage] ❌ REJECT - Repeated line (${count}x): "${preview}"`);
      return false;
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Page Accepted
  // ───────────────────────────────────────────────────────────────────────────
  console.log(`[isUsefulPage] ✅ KEEP - ${wordCount} words, ${(alphaRatio * 100).toFixed(1)}% alpha`);
  return true;
}

/**
 * Filters an array of pages, keeping only meaningful content.
 * 
 * @param pages - Array of page/section texts
 * @returns Filtered array containing only useful pages
 */
export function filterPages(pages: string[]): string[] {
  console.log(`\n[filterPages] Filtering ${pages.length} pages/sections...`);
  
  let rejectedCount = 0;
  const rejectionReasons: Record<string, number> = {
    wordCount: 0,
    navigation: 0,
    alphaRatio: 0,
    repetition: 0,
  };
  
  const useful = pages.filter((page, index) => {
    const result = isUsefulPage(page);
    if (!result) {
      rejectedCount++;
      // Track rejection reasons (this is approximate based on the last log)
    }
    return result;
  });
  
  const removed = pages.length - useful.length;
  console.log(`[filterPages] ✅ Kept ${useful.length} | ❌ Removed ${removed}`);
  
  if (useful.length === 0) {
    console.log("\n⚠️  WARNING: ALL PAGES WERE REJECTED!");
    console.log("This might indicate the filtering is too aggressive.");
    console.log("Consider reviewing the isUsefulPage() criteria or the input text.\n");
  }
  
  console.log("");
  return useful;
}

/**
 * Recombines filtered pages back into a single text string.
 * 
 * @param pages - Array of filtered page texts
 * @returns Single string with pages joined by double newlines
 */
export function recombinePages(pages: string[]): string {
  console.log(`[recombinePages] Recombining ${pages.length} pages...`);
  return pages.join("\n\n");
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Counts words in text by splitting on whitespace.
 * 
 * @param text - Input text
 * @returns Number of words
 */
function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPLETE PREPROCESSING PIPELINE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Complete preprocessing pipeline: Split → Filter → Recombine
 * 
 * Use this before chunking to ensure only meaningful content is processed.
 * 
 * @param text - Cleaned text from PDF extraction
 * @returns Filtered text ready for chunking
 * 
 * @example
 * ```typescript
 * const cleanedText = cleanText(rawPdfText);
 * const filteredText = preprocessText(cleanedText);
 * const chunks = chunkText(filteredText);
 * ```
 */
export function preprocessText(text: string): string {
  console.log("\n" + "=".repeat(60));
  console.log("🔍 PAGE-LEVEL PREPROCESSING STARTED");
  console.log("=".repeat(60));
  
  const pages = splitIntoPages(text);
  const filtered = filterPages(pages);
  
  // Safety check: if all pages were rejected, return original text
  // This prevents chunking from failing with empty input
  if (filtered.length === 0) {
    console.log("⚠️  SAFETY FALLBACK: All pages rejected, using original text");
    console.log("=".repeat(60) + "\n");
    return text;
  }
  
  const recombined = recombinePages(filtered);
  
  console.log("=".repeat(60));
  console.log("✅ PREPROCESSING COMPLETE");
  console.log(`   Input: ${text.length} chars`);
  console.log(`   Output: ${recombined.length} chars`);
  console.log(`   Reduction: ${((1 - recombined.length / text.length) * 100).toFixed(1)}%`);
  console.log("=".repeat(60) + "\n");
  
  return recombined;
}
