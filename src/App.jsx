


 import React, { useState ,useEffect} from 'react';
 import axios from 'axios';
//  import { saveAs } from 'file-saver';
import { Document, Page, Text, View, PDFViewer, PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';

import MyDocument from './Mydocument';



 const EntryScreen = () => {

 

   const [headerFields, setHeaderFields] = useState({
     vr_no: '',
     vr_date: '',
     ac_name: '',
     status: '',
     ac_amt: ''
     
   });

   const [detailRows, setDetailRows] = useState([]);
   const [totalAmount, setTotalAmount] = useState(0);
   const [headerValid, setHeaderValid] = useState(false);
  const [detailValid, setDetailValid] = useState(false);

   const handleHeaderChange = (e) => {
     const { name, value } = e.target;
     setHeaderFields(prevState => ({
       ...prevState,
       [name]: value
     }));
   };

   useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      detailRows.forEach(row => {
        total += parseFloat(row.amount || 0);
      });
      setTotalAmount(total);
      setHeaderFields(prevState => ({
        ...prevState,
        ac_amt: total // Update ac_amt in headerFields with the total amount
      }));
      
    };
    calculateTotalAmount();
    
  }, [detailRows]);

 
  useEffect(() => {
    // Check if header fields are valid
    const headerIsValid = Object.values(headerFields).slice(0, -1).every(value => typeof value === 'string' && value.trim() !== '');
    setHeaderValid(headerIsValid);
  
    // Check if detail rows are valid
    const detailRowsAreValid = detailRows.every(row =>
      Object.values(row).slice(2).every(value => typeof value === 'string' && value.trim() !== '')
    );
    setDetailValid(detailRowsAreValid);
  
  }, [headerFields, detailRows]);
  
  
  
  


  const handleAddDetailRow = () => {
    const newSrNo = detailRows.length + 1;

    setDetailRows(prevRows => [
      ...prevRows,
      {
        vr_no: headerFields.vr_no,
        sr_no: newSrNo,
        item_code: '', // Change from item_code to itemCode
        item_name: '', // Change from item_name to itemName
        description: 'h',
        qty: '', // Change from qty to quantity
        rate: ''
       
      }
    ]);
  };

  const handleDetailRowChange = (index, e) => {
    const { name, value } = e.target;
    setDetailRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index][name] = value;
  
      if (name === 'qty' || name === 'rate') {
        const qty = parseFloat(updatedRows[index].qty || 0); // Parse quantity as a number
        const rate = parseFloat(updatedRows[index].rate || 0); // Parse rate as a number
        updatedRows[index].amount = (qty * rate).toFixed(2); // Calculate amount and round to 2 decimal places
      }
  
      return updatedRows;
    });
  };
  const refresh=()=>{
   setDetailRows(()=>[])
   setHeaderFields(()=>{
    return { vr_no: '',
    vr_date: '',
    ac_name: '',
    status: '',
    ac_amt: ''}
    
   })
  }

   const sendDataToServer = async () => {
    const postData = {
      header_table: headerFields,
      detail_table: detailRows
    };
    console.log(postData)
     try {
       const response = await axios.post('http://5.189.180.8:8010/header', {
         header_table: headerFields,
         detail_table: detailRows
       });

       console.log('Data sent successfully:', response.data);
       // Handle success, show success message, etc.
     } catch (error) {
       console.error('Error sending data:', error);
       // Handle error, show error message, etc.
     }

     }

   return (
     <div className="w-3/4 mx-auto">
       <div className="mt-8">
         <div>
           {/* Header input fields */}
            
           <h2 className="text-2xl font-bold mb-2">HEADER</h2>
           <div className="grid grid-cols-2 gap-4">
           <div>
    <label htmlFor="vrName">VR Name:</label>
    <input type="text" id="vr_no" name="vr_no" value={headerFields.vr_no} onChange={handleHeaderChange}  className={`border p-2 rounded w-full ${headerValid ? '' : 'border-red-500'}`} required />
  </div>
  <div>
    <label htmlFor="vr_date">VR Date:</label>
    <input type="text" id="vr_date" name="vr_date" value={headerFields.vr_date} onChange={handleHeaderChange} className={`border p-2 rounded w-full ${headerValid ? '' : 'border-red-500'}`} required/>
  </div>
  <div>
    <label htmlFor="status">Status:</label>
    <input type="text" id="status" name="status" value={headerFields.status} onChange={handleHeaderChange} className={`border p-2 rounded w-full ${headerValid ? '' : 'border-red-500'}`} required/>
  </div>
  <div>
    <label htmlFor="acNumber">AC Number:</label>
    <input type="text" id="ac_name" name="ac_name" value={headerFields.ac_name} onChange={handleHeaderChange}  className={`border p-2 rounded w-full ${headerValid ? '' : 'border-red-500'}`} required />
  </div>
  <div>
    <label htmlFor="acAmount">AC Amount:</label>
    <input type="text" name="ac_amt" value={headerFields.ac_amt} readOnly className="border p-1 rounded mr-2" /> 
    {/* <input type="text" id="acAmount" name="acAmount" value={headerFields.acAmount} onChange={handleHeaderChange} className="border p-2 rounded w-full" /> */}
  </div>
         </div>
         </div>
         <div>
         {/* Detail input fields */}
  
 <h2 className="text-2xl font-bold mb-2">DETAIL</h2>

<div>
{detailRows.map((row, index) => (
  <div key={index} className="flex mb-4">
  <input type="text" name="srNo" value={row.sr_no} placeholder="SR No." className="border p-1 rounded  w-1/12 mr-2" readOnly /> {/* Changed from item_code to itemCode */}
  <input type="text" name="item_code" value={row.item_code} onChange={(e) => handleDetailRowChange(index, e)} placeholder="Item Code" className={`border p-1 rounded w-2/12 mr-2 ${detailValid ? '' : 'border-red-500'}`} required />
  <input type="text" name="item_name" value={row.item_name} onChange={(e) => handleDetailRowChange(index, e)} placeholder="Item Name" className={`border p-1 rounded w-4/12 mr-2 ${detailValid ? '' : 'border-red-500'}`} required />
  <input type="text" name="qty" value={row.qty} onChange={(e) => handleDetailRowChange(index, e)} placeholder="Quantity"  className={`border p-1 rounded w-1/12 mr-2 ${detailValid ? '' : 'border-red-500'}`} required /> {/* Changed from qty to quantity */}
  <input type="text" name="rate" value={row.rate} onChange={(e) => handleDetailRowChange(index, e)} placeholder="Rate" className={`border p-1 rounded w-1/12 mr-2 ${detailValid ? '' : 'border-red-500'}`} required />
  <input type="text" name="amount" value={row.amount} readOnly className="border p-1 rounded  w-1/12 mr-2" />
</div>
))}
 <div className="flex mb-4">
            <input type="text" value="Total Amount" className="border p-1 rounded mr-2" readOnly />
            <input type="text" value={totalAmount} className="border p-1 rounded mr-2" readOnly />
          </div>
</div> 
        </div>
         <button onClick={handleAddDetailRow} className="bg-blue-500 text-white py-2 ml-2 px-4 rounded mb-4">Add Detail Row</button>
         <button onClick={sendDataToServer}className="bg-green-500 text-white py-2 ml-10 px-4 rounded" disabled={!headerValid || !detailValid} >Send Data</button>
         <button onClick={refresh} className="bg-blue-500 text-white py-2 ml-2 px-4 rounded mb-4">Refresh</button>
         
         <div>
      <PDFDownloadLink document={<MyDocument  headerFields={headerFields} detailRows={detailRows} totalAmount={totalAmount}  />} fileName="document.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
       </div>
     </div>
   );
 };
 
 

 export default EntryScreen;
