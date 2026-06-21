import { jsPDF } from "jspdf";
import vckLogo from "@/assets/vck-logo.png?inline";
import mlaPhoto from "@/assets/vanni-arasu.png?inline";
import notoTamilRegularUrl from "@/assets/fonts/NotoSansTamil-Regular.ttf";
import notoTamilBoldUrl from "@/assets/fonts/NotoSansTamil-Bold.ttf";

const NAVY = "#0B1F3A";
const ROYAL = "#1565C0";
const GREY = "#464646";
const GOLD: [number, number, number] = [251, 192, 45];

export const LETTERHEAD_MARGIN = 48;

const FONT_FAMILY = "LetterheadTamil";
// jsPDF's TTF embedding maps Unicode codepoints straight to glyphs with no Indic
// reordering pass, which garbles Tamil vowel signs like ெ/ே/ை/ொ/ோ. Rasterizing
// through the browser's own text engine (Canvas2D) shapes them correctly instead.
const RASTER_SCALE = 3;
const PT_TO_PX = 96 / 72;

let fontsReady: Promise<void> | null = null;
function loadFonts(): Promise<void> {
  if (!fontsReady) {
    fontsReady = (async () => {
      const [regular, bold] = await Promise.all([
        new FontFace(FONT_FAMILY, `url(${notoTamilRegularUrl})`, { weight: "400" }).load(),
        new FontFace(FONT_FAMILY, `url(${notoTamilBoldUrl})`, { weight: "700" }).load(),
      ]);
      document.fonts.add(regular);
      document.fonts.add(bold);
    })();
  }
  return fontsReady;
}

function rasterizeText(text: string, fontSizePt: number, weight: 400 | 700, color: string) {
  const fontPx = fontSizePt * PT_TO_PX * RASTER_SCALE;
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = `${weight} ${fontPx}px ${FONT_FAMILY}`;
  const m = probe.measureText(text);
  const left = Math.ceil(m.actualBoundingBoxLeft || 0);
  const right = Math.ceil(m.actualBoundingBoxRight || m.width);
  const ascent = Math.ceil(m.actualBoundingBoxAscent || fontPx * 0.9);
  const descent = Math.ceil(m.actualBoundingBoxDescent || fontPx * 0.25);

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, left + right);
  canvas.height = Math.max(1, ascent + descent);
  const ctx = canvas.getContext("2d")!;
  ctx.font = `${weight} ${fontPx}px ${FONT_FAMILY}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, left, ascent);

  return {
    dataUrl: canvas.toDataURL("image/png"),
    widthPt: canvas.width / RASTER_SCALE / PT_TO_PX,
    heightPt: canvas.height / RASTER_SCALE / PT_TO_PX,
    ascentPt: ascent / RASTER_SCALE / PT_TO_PX,
  };
}

type Align = "left" | "center" | "right";

/** Draws Tamil text at (x, yBaseline) — same anchor semantics as jsPDF's own doc.text(). */
function drawText(
  doc: jsPDF,
  text: string,
  x: number,
  yBaseline: number,
  fontSizePt: number,
  weight: 400 | 700,
  color: string,
  align: Align = "left",
) {
  const img = rasterizeText(text, fontSizePt, weight, color);
  const drawX = align === "center" ? x - img.widthPt / 2 : align === "right" ? x - img.widthPt : x;
  doc.addImage(img.dataUrl, "PNG", drawX, yBaseline - img.ascentPt, img.widthPt, img.heightPt);
}

/**
 * Draws the VCK emblem + party name + Vanni Arasu MLA photo/designation header,
 * followed by a gold double rule. Returns the y position where body content can start.
 * Shared by the blank letterhead and the petition-copy PDF so both carry the same letterhead.
 */
export async function drawLetterheadHeader(doc: jsPDF): Promise<number> {
  await loadFonts();

  const pageW = doc.internal.pageSize.getWidth();
  const margin = LETTERHEAD_MARGIN;

  // Header: emblem (left), party name + slogan (center), MLA photo + designation (right)
  doc.addImage(vckLogo, "PNG", margin, 30, 60, 60);
  doc.addImage(mlaPhoto, "PNG", pageW - margin - 56, 28, 56, 56);

  drawText(doc, "விடுதலைச் சிறுத்தைகள் கட்சி", pageW / 2, 56, 21, 700, NAVY, "center");
  drawText(doc, "சாதி ஒழிப்பே மக்கள் விடுதலை", pageW / 2, 74, 11, 400, ROYAL, "center");

  drawText(doc, "வண்ணி அரசு", pageW - margin - 28, 94, 11, 700, NAVY, "center");
  drawText(doc, "சட்டமன்ற உறுப்பினர் – திண்டிவனம்", pageW - margin - 28, 105, 8.5, 400, NAVY, "center");

  // Gold double rule under the header
  let y = 116;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(2.2);
  doc.line(margin, y, pageW - margin, y);
  y += 4;
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageW - margin, y);

  return y + 26;
}

/** Draws the office address/contact footer above a gold rule. Call after drawLetterheadHeader (fonts already loaded). */
export function drawLetterheadFooter(doc: jsPDF): void {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = LETTERHEAD_MARGIN;

  const footerY = pageH - 64;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(margin, footerY, pageW - margin, footerY);

  drawText(
    doc,
    "சட்டமன்ற உறுப்பினர் அலுவலகம், திண்டிவனம், விழுப்புரம் மாவட்டம், தமிழ்நாடு – 604001",
    pageW / 2,
    footerY + 18,
    9.5,
    400,
    NAVY,
    "center",
  );
  drawText(
    doc,
    "தொலைபேசி: +91 98000 00000      மின்னஞ்சல்: contact@vanniarasu.in",
    pageW / 2,
    footerY + 33,
    9.5,
    400,
    ROYAL,
    "center",
  );
}

/** A4 letterhead with the VCK emblem + Vanni Arasu MLA office details; body left blank for the letter itself. */
export async function generateLetterheadPdf(): Promise<Blob> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = LETTERHEAD_MARGIN;

  let y = await drawLetterheadHeader(doc);

  // Ref / date line, then blank body for the letter
  drawText(doc, "எண்: ........................................", margin, y, 10.5, 400, GREY, "left");
  drawText(doc, "தேதி: ........................................", pageW - margin, y, 10.5, 400, GREY, "right");

  drawLetterheadFooter(doc);

  return doc.output("blob");
}

export async function downloadLetterheadPdf() {
  const blob = await generateLetterheadPdf();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vck-letterhead.pdf";
  a.click();
  URL.revokeObjectURL(url);
}
