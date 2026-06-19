import { jsPDF } from "jspdf";
import type { Petition } from "@/lib/petitions";

export function generatePetitionPdf(petition: Petition): Blob {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 56;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Vanni Arasu MLA Office — Petition Copy", margin, y);
  y += 18;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.5);
  doc.line(margin, y, 595 - margin, y);
  y += 30;

  const row = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
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
  const lines = doc.splitTextToSize(petition.description ?? "", 595 - margin * 2);
  doc.text(lines, margin, y);
  y += lines.length * 14 + 30;

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Keep this copy for reference. Track your petition's progress anytime on the Ongoing Works page.",
    margin,
    y,
  );

  return doc.output("blob");
}
