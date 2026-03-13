// helpers/wordGenerator.js
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";
import saveAs from "file-saver"; // Useful for triggering the browser download

export const generateWordReport = async (data) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            text: "ONE HEART SCHOOLS",
            heading: "Heading1",
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: "Official Academic Result Slip",
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Student Info
          new Paragraph({
            children: [
              new TextRun({
                text: `NAME: ${data.name.toUpperCase()}`,
                bold: true,
              }),
            ],
            spacing: { after: 200 },
          }),

          // Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Header Row
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Subject")] }),
                  new TableCell({ children: [new Paragraph("Score")] }),
                ],
              }),
              // Data Rows
              ...[
                ["Mathematics", data.maths],
                ["English", data.english],
                ["Swahili", data.swahili],
                ["Programming", data.programming],
              ].map(
                ([label, score]) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph(label)] }),
                      new TableCell({
                        children: [new Paragraph(score.toString())],
                      }),
                    ],
                  })
              ),
            ],
          }),

          // Totals
          new Paragraph({
            text: `GRAND TOTAL: ${data.totals}`,
            alignment: AlignmentType.RIGHT,
            spacing: { before: 200, after: 400 },
          }),

          // Signatures
          new Paragraph({
            children: [
              new TextRun({
                text: "____________________            ____________________",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Class Teacher                     Head of Institution",
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Convert to blob and download
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.name}_Report.docx`);
};
