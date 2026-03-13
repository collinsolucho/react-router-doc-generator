import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  // Header Styling
  header: { marginBottom: 20, textAlign: "center" },
  schoolName: { fontSize: 22, fontWeight: "bold", textTransform: "uppercase" },
  subHeader: { fontSize: 14, marginTop: 5, color: "#4b5563" },

  // Student Info Section
  studentInfo: { marginVertical: 20, borderBottom: "1 solid #000", pb: 10 },

  // Table Styling
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f3f4f6",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: 5, fontSize: 10, fontWeight: "bold" },

  // Totals Section
  totalsSection: { marginTop: 15, textAlign: "right", paddingRight: 10 },

  // Signature Section
  signatureContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sigBlock: {
    width: "40%",
    borderTop: "1 solid #000",
    textAlign: "center",
    paddingTop: 5,
  },
});

export const ReportCard = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Centered Bold Heading */}
      <View style={styles.header}>
        <Text style={styles.schoolName}>ONE HEART SCHOOLS</Text>
        <Text style={styles.subHeader}>Official Academic Result Slip</Text>
      </View>

      <View style={styles.studentInfo}>
        <Text>NAME: {data.name.toUpperCase()}</Text>
        <Text>DATE: {new Date().toLocaleDateString()}</Text>
      </View>

      {/* Subject Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Subject</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Score</Text>
          </View>
        </View>
        {/* Table Rows */}
        {[
          { label: "Mathematics", score: data.maths },
          { label: "English", score: data.english },
          { label: "Swahili", score: data.swahili },
          { label: "Programming", score: data.programming },
        ].map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.label}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.score}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalsSection}>
        <Text style={{ fontWeight: "bold" }}>GRAND TOTAL: {data.totals}</Text>
      </View>

      {/* Signature Placeholders */}
      <View style={styles.signatureContainer}>
        <View style={styles.sigBlock}>
          <Text>Class Teacher</Text>
        </View>
        <View style={styles.sigBlock}>
          <Text>Head of Institution</Text>
        </View>
      </View>
    </Page>
  </Document>
);
