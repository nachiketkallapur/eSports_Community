import React from 'react'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
const MyDoc = () => (
    <Document>
        <Page>
            Nachiket is good boy
        </Page>
    </Document>
)

const PDFGenerator = () => (
    <div>
        {/* <PDFDownloadLink document={<MyDoc />} fileName="temp.pdf">
            Download
        </PDFDownloadLink> */}
        pdf download link
    </div>
)


export default PDFGenerator;
