// @flow strict

import { PayStack , FlutterWave } from "@chzdo_apps/react-paystack-flutter-payment"
import React from 'react'


function Paystack_Fluterwave() {
    return (
        <div>
              <FlutterWave

customer={{
  email: state.email,
  phonenumber: state.phone,
  name: state.name  }}
  amount={state.amount}
  currency="NGN"
 verify={{
  url: "<your API URL>",
  options: {
  method: "<Your Prefered Request Method>",
  },
  Component: ()=><i  class="fas fa-spin"></i>
}}
publicKey="Your Flutter wave Key"
onSuccess={(r) => console.log(r)}
onClose={(e) => console.log('closed',e)}
text={'Flutter Product'}
buttonStyle={{
  background: 'red',
  borderWidth: 0,
  boxShadow: "0px 1px 2px 5px black",
  cursor: 'grab'
}}
/>
            
        </div>
    );
};

export default Paystack_Fluterwave;



      