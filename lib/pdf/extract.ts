import { PDFParse } from "pdf-parse";

export interface ExtractionResult {
  text: string;
  pageCount: number;
}

/**
 * Extracts and cleans text from a PDF buffer.
 * Uses the new pdf-parse v2 class-based API:
 *   new PDFParse({ data }) → getText() → result.text / result.total
 */
export async function extractTextFromPDF(
  buffer: Buffer
): Promise<ExtractionResult> {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    const text = cleanText(result.text);
    return { text, pageCount: result.total };
  } finally {
    await parser.destroy();
  }
}

function cleanText(raw: string): string {
  return (
    raw
      // Normalize line endings
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")

      // Rejoin words broken across lines with a hyphen (common in PDFs)
      // e.g., "exam-\nple" → "example"
      .replace(/-\n(\S)/g, "$1")

      // Collapse lines that are mid-sentence (no period/colon before the break)
      // This reconnects paragraphs that were split by column layout
      .replace(/([a-z,;])\n([a-z])/g, "$1 $2")

      // Collapse more than 2 consecutive blank lines into exactly 2
      .replace(/\n{3,}/g, "\n\n")

      // Collapse multiple spaces/tabs on a single line into one space
      .replace(/[ \t]{2,}/g, " ")

      // Trim leading/trailing whitespace from each line
      .split("\n")
      .map((line) => line.trim())
      .join("\n")

      // Final trim
      .trim()
  );
}
