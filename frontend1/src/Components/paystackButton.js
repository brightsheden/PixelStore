import React from 'react';
  
import { PaystackButton } from 'react-paystack';

  
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "bright@gmail.com",
    amount: 20000,
    publicKey: 'pk_test_d2c93ba373fc7748f437a9d7d98ca1e6f4538ef2',
  };
  
  function Pay() {
    // you can call this function anything
    const handlePaystackSuccessAction = (reference) => {
      // Implementation for whatever you want to do with reference and after success call.
        alert("payment done")
      console.log(reference);
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const componentProps = {
        ...config,
        text: 'pay Now',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
     
        
        <div><PaystackButton  {...componentProps} style={{
            color : 'red'
        }} /></div>
        
      
    );
  }
  
  export default Pay;