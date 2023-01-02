import React from 'react';
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import { useDispatch ,useSelector} from 'react-redux';
import { sendEmail } from '../features/auth/authSlice'; 
import Spinner from '../components/Spinner'

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

const MyDoc = ({udata,data}) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>{data.title} Certificate</Text>
      <Text style={styles.text}>
        Congratulations {udata.name}!!! you Have completed this course successfuly with a certficate from Oraaa.
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




function DownloadAsPdf({data,udata}) {
  const { isLoading } = useSelector(
    (state) => state.auth)
  const dispatch = useDispatch()  


  if (isLoading) {
    return <Spinner/>
  }
  
  return (
    
    <div>
      <PDFDownloadLink document={<MyDoc udata={udata} data={data} />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <button type='submit' className='btn btn-block'>Certificate</button>)}
    </PDFDownloadLink>
    <PDFDownloadLink document={<MyDoc udata={udata} data={data} />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <button type='submit' className='btn btn-block' onClick={(e)=>{
        e.preventDefault()
        dispatch(sendEmail())
      }}>Recieve notification via email</button>)}
    </PDFDownloadLink>
    </div>
    
  );
}

export default DownloadAsPdf;