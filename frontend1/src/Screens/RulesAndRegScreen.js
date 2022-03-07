// @flow strict

import * as React from 'react';
import Helmet from 'react-helmet';

function RulesAndRegScreen() {
    return (
        <div>
            <Helmet>
                <title>Rules Guiding Sellers on PLPFACTORY</title>
                <meta property='description' content='General Rules and Regulations, all sellers must read and follow' />
            </Helmet>

            <h2><strong>General Rules Guiding Seller on PlpFactory</strong></h2>
            <p>All Sellers must follow the terms and conditions</p>

            <ul>
                <li>Seller Template Price should not above  <strong>$10</strong> , till further Notice..</li>
                <li> <strong>Seller must use PlpFactory thumbnail Template for their Template cover photo</strong>  </li>
                <li><strong>Seller must provide at least 2-4 free template every month</strong></li>
                <li>There would be discount every weekend. </li>
                <li>Pornography, Sex contents will be removed automatically and the 
                 seller that is responsible for it would be ban for a week. </li>
                <li><strong>Note: </strong> Maximum of 5 paid template per month.</li>
          
                <li>Non Performing Template will be removed after a month.</li>
                <li>Best performing Template will be given more promotion and concentation every weeks</li>
                <li>Learn how to use dummy data , to represent your image and text, such as "lorem ipsum text " for some text in your designs </li>
            </ul>

            <h3><strong>Withdrawal Rules</strong></h3>
            <ul>
                <li>You are eligible to withdraw Once you have minimum of <strong>$10.99</strong> in your wallet</li>
                <li>All withdrawal placed within the week will be paid to sellers every sunday</li>
                <li><strong>Note:20% will be deducted from your withdrawal amount while 80% will be paid to sellers on every withdrawal</strong></li>
                <li>Always withdraw with your  valid payPal email</li>
                <li>Sellers from Nigeria can apply for withdrawal with their valid local bank account details</li>
                <li><strong>Note: we have no algorithm to detect valid payPalId or bank details, always make sure  you submit correct/valid withfrawal details</strong></li>
                
            </ul>

            
        </div>
    );
};

export default RulesAndRegScreen;