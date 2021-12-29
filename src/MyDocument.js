import React from "react";
import { Document, Image, Page, PDFViewer, Text } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page>
      <Text>Image test</Text>
    </Page>
  </Document>
);

export default MyDocument;
