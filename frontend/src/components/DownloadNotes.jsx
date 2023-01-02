import React from 'react';
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

const MyDoc = ({notes}) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>Notes</Text>
      <Text style={styles.text}>
         {notes}
      </Text>
      <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
    </Page>
  </Document>
);




function DownloadNotes({notes}) {
  return (
    <div>
      <PDFDownloadLink document={<MyDoc notes={notes}  />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <button type='submit' className='btn btn-block'>Download Notes</button>)}
    </PDFDownloadLink>
    </div>
  );
}

export default DownloadNotes;