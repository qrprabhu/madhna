import { jsPDF } from "jspdf";
import type { Petition } from "@/lib/petitions";
import { LETTERHEAD_MARGIN, drawLetterheadFooter, drawLetterheadHeader } from "@/lib/letterhead-pdf";

export async function generatePetitionPdf(petition: Petition): Promise<Blob> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = LETTERHEAD_MARGIN;
  const pageW = doc.internal.pageSize.getWidth();

  let y = await drawLetterheadHeader(doc);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(11, 31, 58);
  doc.text("Petition Copy", margin, y);
  y += 26;

  const row = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(value || "—", margin + 130, y);
    y += 22;
  };

  row("Petition ID", `#${petition.id}`);
  row("Submitted On", petition.created_at ? new Date(petition.created_at).toLocaleString("en-IN") : "—");
  row("Status", petition.status ?? "Pending");
  row("Name", petition.name ?? "");
  row("Phone", petition.phone ?? "");
  row("Area / Village", petition.area ?? "");
  row("Address", petition.address ?? "");
  row("Category", petition.category ?? "");

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Problem Description", margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(petition.description ?? "", pageW - margin * 2);
  doc.text(lines, margin, y);
  y += lines.length * 14 + 20;

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Keep this copy for reference. Track your petition's progress anytime on the Ongoing Works page.",
    margin,
    y,
  );

  drawLetterheadFooter(doc);

  return doc.output("blob");
}
