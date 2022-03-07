// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet'

function FaqScreen() {
    return (
        <div>
            <Helmet>
                <title>Faqs</title>
                <meta property='description' content='Frequently ask questions || You got questions we get answers' />
            </Helmet>
            
            <h2><strong>FREQUENTLY ASK QUESTIONS</strong></h2>
            <p><strong>These are frequently ask questions , kindly contacts us for more query</strong></p>

           
            <div>
            <h4><strong>Q:How can i Register as a Seller on this Platform</strong></h4>
            <p>You can be registerd as a seller once you have agree to pay sum of $5.00 , by simply click on Apply for seller account button at the Header tab,
                Your account will be approved within 24hrs. 
            </p>

            <h4><strong>Q:How can i upload my templates</strong></h4>
            <p>You can upload your Template files by simply click on Create Template button in your <Link to='/profile'>Profile</Link>
            </p>


            <h4><strong>Q:Can i delete or Update my Template after being Posted</strong></h4>
            <p>Yeah, you are free to delete and update your Templates after being posted, you are responsible for whatever you uploaded!.
            </p>

            
            <h4><strong>Q:HOW WILL I BE PAID AFTER USER PURCHASE MY TEMPLATES</strong></h4>
            <p>
                You can withdraw or cashout your Earnings once you have minimum of <strong>$10.99</strong> in your wallet,
                by simply navigate to <Link to='/withdraw'>apply for withdrawal page</Link>  and submit your PayPal_id or yor local bank details
            </p>

            <h4><strong>Q:WHEN WILL I RECEIVE MY PAYMENT</strong></h4>
            <p>
              All payments will be paid to sellers every sunday.
            </p>

            <h4><strong>Q:HAVING ISSUES IN CUSTOMIZE/EDIT TEMPLATE FILES, DOWNLOAD HERE</strong></h4>
            <p>
              Once you have successfully download .plp zip file here, kindly move it to Preset folder, inside Pixellab folder on your device,
              then unzip it there, after that open Pixellab app and locate it at the projects tab!.
            </p>


            <h4><strong>Q:HOW WILL I PREPARE MY PIXELLAB PROJECTS FOR SELL</strong></h4>
            <p>
              Once you are done with the design , kindly save it as a projects, then , locate the design in your preset folder and covert it to zip file.
            </p>




             
            <h4><strong>Q:WHAT IS MY BENEFIT FOR SELLEING MY TEMPLATE HERE</strong></h4>
            <p>
               There are thousands of benefit for you while marketing your templates here!!
               <ul>
                   <li>Earning passive income from your designs.</li>
                   <li>Free promotion for your designs.</li>
                   <li>You Earn Daily from your designs.</li>
                   <li>Free graphics resources for your next design.</li>
                   <li>Free tutorials and training for you.</li>
                   <li>You get connected to different clients arround the world.</li>
                   <li>Be your own Boss, etc.</li>
               </ul>

            </p>

            <h4><strong>Q:CAN I CHANGE THE PRICE OF MY TEMPLATE AT ANY TIME , I WISH.</strong></h4>
            <p>
            You are free to change the price of your templates at any time you wish,but always follow our rules guiding Templates price, for all seller.
            </p>


        

         

            </div>

        </div>
    )
};

export default FaqScreen;