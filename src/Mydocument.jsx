// MyDocument.jsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const MyDocument = ({ headerFields, detailRows ,totalAmount }) => { // Receive headerFields as a prop
  // Your MyDocument component content
  const styles = StyleSheet.create({
    page: {
        flexDirection: 'column', // Change flexDirection to column
        backgroundColor: '#E4E4E4',
        padding: 10,
      },
      row: {
        flexDirection: 'row', // Arrange views in rows
        justifyContent: 'space-between', // Align views with space between
        marginBottom: 10,
        backgroundColor: 'lightblue',
      },
      section: {
        width: '30%', // Adjust width of each section
        padding: 5,
       
      },
      text: {
        fontSize: 12,
        marginBottom: 5,
      },
      boldText: {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold', // Add fontWeight property for bold text
      },
  });
  
  return (
    <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.boldText}>Header </Text>
            </View>
          <View style={styles.section}>
            <Text style={styles.text}>VR Name: {headerFields.vr_no}</Text>
            <Text style={styles.text}>VR Date: {headerFields.vr_date}</Text>
            <Text style={styles.text}>Status: {headerFields.status}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>AC Number: {headerFields.ac_name}</Text>
            <Text style={styles.text}>AC Amount: {headerFields.ac_amt}</Text>
          </View>
          </View>
          {detailRows.map((row, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.section}>
              <Text style={styles.text}>sl.no</Text>
              <Text style={styles.text}>{row.sr_no}</Text>
            </View>
              <View style={styles.section}>
              <Text style={styles.text}>Item Code:</Text>
              <Text style={styles.text}>{row.item_code}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>Item Name:</Text>
              <Text style={styles.text}>{row.item_name}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>Quantity:</Text>
              <Text style={styles.text}>{row.qty}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>Rate:</Text>
              <Text style={styles.text}>{row.rate}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>Amount:</Text>
              <Text style={styles.text}>{row.amount}</Text>
            </View>
          </View>
        ))}

        <View style={styles.row}>

          <View style={styles.section}>
            <Text style={styles.text}>Total Amount: {totalAmount}</Text>
          </View>
          </View>

        </Page>
      </Document>
  );
};

export default MyDocument;
