"""
One-shot script to convert co-located PDFs in posts/<uid>/ into markdown.

Extracts:
  - Text blocks (stripped of repeated headers/footers)
  - Embedded images (saved as img-NN.png)
  - Tables (converted to markdown tables when possible)

Overwrites index.md with full markdown content, preserving frontmatter
but changing type to "markdown".

Requires: pip install pymupdf
"""

import re
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("ERROR: PyMuPDF not installed. Run: pip install pymupdf")
    sys.exit(1)

POSTS_DIR = Path(__file__).resolve().parent.parent / "posts"

HEADER_FOOTER_PATTERNS = [
    re.compile(r"^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(st|nd|rd|th)?,?\s*\d{4}$"),
    re.compile(r"^Copyright\s*©.*Adam Sokacz.*$"),
    re.compile(r"^Personal Whitepaper$"),
    re.compile(r"^\d+$"),  # standalone page numbers
]


def is_header_footer(line: str) -> bool:
    stripped = line.strip()
    if not stripped:
        return False
    for pat in HEADER_FOOTER_PATTERNS:
        if pat.match(stripped):
            return True
    return False


def extract_images(page, uid_dir: Path, img_counter: int) -> tuple[list[str], int]:
    """Extract images from a page, save to disk, return markdown refs."""
    md_refs = []
    image_list = page.get_images(full=True)

    for img_info in image_list:
        xref = img_info[0]
        try:
            pix = fitz.Pixmap(page.parent, xref)
        except Exception:
            continue

        if pix.width < 30 or pix.height < 30:
            pix = None
            continue

        if pix.alpha:
            pix = fitz.Pixmap(fitz.csRGB, pix)

        img_counter += 1
        filename = f"img-{img_counter:02d}.png"
        filepath = uid_dir / filename
        pix.save(str(filepath))
        pix = None

        md_refs.append(f"\n![Figure {img_counter}](./{filename})\n")

    return md_refs, img_counter


def table_to_markdown(table) -> str:
    """Convert a PyMuPDF table to a markdown table string."""
    rows = table.extract()
    if not rows or len(rows) < 1:
        return ""

    def cell_text(cell):
        if cell is None:
            return ""
        return str(cell).replace("\n", " ").strip()

    header = rows[0]
    col_count = len(header)

    lines = []
    lines.append("| " + " | ".join(cell_text(c) for c in header) + " |")
    lines.append("| " + " | ".join("---" for _ in range(col_count)) + " |")

    for row in rows[1:]:
        padded = list(row) + [""] * (col_count - len(row))
        lines.append("| " + " | ".join(cell_text(c) for c in padded[:col_count]) + " |")

    return "\n".join(lines)


def extract_page_text(page) -> str:
    """Extract text from a page, filtering headers/footers."""
    blocks = page.get_text("blocks", sort=True)
    lines = []
    for block in blocks:
        if block[6] != 0:  # skip image blocks (type=1)
            continue
        text = block[4].strip()
        if not text:
            continue

        block_lines = text.split("\n")
        filtered = [l for l in block_lines if not is_header_footer(l)]
        if filtered:
            lines.append("\n".join(filtered))

    return "\n\n".join(lines)


def process_pdf(pdf_path: Path, uid_dir: Path):
    """Process a single PDF and return markdown body + list of extracted files."""
    doc = fitz.open(str(pdf_path))
    md_sections = []
    img_counter = 0

    for page_num in range(doc.page_count):
        page = doc[page_num]

        # Extract tables first
        tables = page.find_tables()
        table_md_parts = []
        for table in tables:
            md_table = table_to_markdown(table)
            if md_table:
                table_md_parts.append(md_table)

        # Extract text
        page_text = extract_page_text(page)

        # Extract images
        img_refs, img_counter = extract_images(page, uid_dir, img_counter)

        if page_text:
            md_sections.append(page_text)

        for tbl in table_md_parts:
            md_sections.append(tbl)

        for img_ref in img_refs:
            md_sections.append(img_ref)

    doc.close()
    return "\n\n".join(md_sections)


def build_frontmatter(uid: str, pdf_filename: str, existing_md: str) -> str:
    """Parse existing frontmatter and update type to markdown."""
    fm_match = re.match(r"^---\s*\n(.*?)\n---", existing_md, re.DOTALL)
    if not fm_match:
        return f"""---
title: "Converted Document"
excerpt: ""
publishDate: "2026-01-01"
type: "markdown"
pdf: "/posts/{uid}/{pdf_filename}"
---"""

    fm_content = fm_match.group(1)
    fm_content = re.sub(r'^type:\s*"pdf"', 'type: "markdown"', fm_content, flags=re.MULTILINE)

    if "pdf:" not in fm_content:
        fm_content += f'\npdf: "/posts/{uid}/{pdf_filename}"'

    return f"---\n{fm_content}\n---"


def main():
    if not POSTS_DIR.exists():
        print(f"Posts directory not found: {POSTS_DIR}")
        sys.exit(1)

    converted = 0

    for uid_dir in sorted(POSTS_DIR.iterdir()):
        if not uid_dir.is_dir():
            continue

        pdfs = list(uid_dir.glob("*.pdf"))
        if not pdfs:
            continue

        index_md = uid_dir / "index.md"
        existing_md = index_md.read_text() if index_md.exists() else ""

        for pdf_path in pdfs:
            print(f"\nProcessing: {pdf_path.name} in {uid_dir.name}")

            md_body = process_pdf(pdf_path, uid_dir)
            frontmatter = build_frontmatter(uid_dir.name, pdf_path.name, existing_md)

            full_md = f"{frontmatter}\n\n{md_body}\n"
            index_md.write_text(full_md)
            print(f"  -> Written {len(full_md)} chars to index.md")
            converted += 1

    print(f"\nDone. Converted {converted} PDF(s) to markdown.")


if __name__ == "__main__":
    main()
