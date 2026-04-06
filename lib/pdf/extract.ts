import { extractText, getDocumentProxy } from "unpdf";

export interface ExtractionResult {
  text: string;
  pageCount: number;
}

/**
 * Extracts and cleans text from a PDF buffer.
 * Uses unpdf to parse the PDF and extract text with merged pages.
 */
export async function extractTextFromPDF(
  buffer: Buffer
): Promise<ExtractionResult> {
  console.log("[PDF Extract] Starting PDF text extraction");
  console.log(`[PDF Extract] Buffer size: ${buffer.length} bytes`);
  
  // Convert Buffer to Uint8Array for unpdf
  const uint8Array = new Uint8Array(buffer);
  console.log(`[PDF Extract] Converted to Uint8Array: ${uint8Array.length} bytes`);
  
  // Load the PDF document
  console.log("[PDF Extract] Loading PDF document proxy...");
  const pdf = await getDocumentProxy(uint8Array);
  console.log(`[PDF Extract] PDF loaded successfully. Number of pages: ${pdf.numPages}`);
  
  // Extract text with pages merged
  console.log("[PDF Extract] Extracting text with merged pages...");
  const result = await extractText(pdf, { mergePages: true });
  console.log(`[PDF Extract] Text extracted. Total pages: ${result.totalPages}`);
  console.log(`[PDF Extract] Raw text length: ${result.text.length} characters`);
  
  // Clean the extracted text
  console.log("[PDF Extract] Cleaning extracted text...");
  const text = cleanText(result.text);
  console.log(`[PDF Extract] Cleaned text length: ${text.length} characters`);
  console.log(`[PDF Extract] Text preview (first 200 chars): ${text.substring(0, 200)}...`);
  
  console.log("[PDF Extract] Extraction completed successfully");
  return { text, pageCount: result.totalPages };
}

function cleanText(raw: string): string {
  return (
    raw
      // Normalize line endings
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")

      // Remove page numbers (various patterns)
      // Patterns: "Page 1", "Page 23", "- 45 -", "| 23 |"
      .replace(/^[\s\-|]*page\s+\d+[\s\-|]*$/gim, "")
      .replace(/^[\s\-|]*\d+[\s\-|]*$/gm, "") // Standalone numbers on their own line
      .replace(/\n\s*\d+\s*\n/g, "\n") // Numbers surrounded by blank lines

      // Remove reference citations
      // Patterns: [1], [23], [Ref], [Author, 2020]
      .replace(/\[\d+\]/g, "")
      .replace(/\[[\w\s,]+\]/g, "")

      // Remove URLs and email addresses
      .replace(/https?:\/\/[^\s]+/gi, "")
      .replace(/www\.[^\s]+/gi, "")
      .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, "")

      // Remove figure/table captions
      // Patterns: "Figure 1:", "Table 2.3:", "Fig. 5:", "Tbl 7:"
      .replace(/^(figure|fig|table|tbl)\.?\s*\d+[.:]?.*$/gim, "")

      // Rejoin words broken across lines with a hyphen (common in PDFs)
      // e.g., "exam-\nple" → "example"
      .replace(/-\n(\S)/g, "$1")

      // Collapse lines that are mid-sentence (no period/colon before the break)
      // This reconnects paragraphs that were split by column layout
      .replace(/([a-z,;])\n([a-z])/g, "$1 $2")

      // Collapse more than 2 consecutive blank lines into exactly 2
      .replace(/\n{3,}/g, "\n\n")

      // Normalize multiple spaces into a single space
      .replace(/[ \t]+/g, " ")

      // Trim leading/trailing whitespace from each line
      .split("\n")
      .map((line) => line.trim())
      .join("\n")

      // Final trim
      .trim()
  );
}
