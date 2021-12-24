// @flow strict

import * as React from 'react';
import { paidTemplate } from '../Actions/templateAction'
import { useSelector,useDispatch } from 'react-redux';

function Earnings({}) {
    const dispatch =useDispatch()
    const purchasedTemplate = useSelector(state => state.purchasedTemplate)
    const {loading:loadingPuchase, error:errorPurchase, purchaseTemplate} = purchasedTemplate

    const templatePay = useSelector(state => state.templatePay)
    const {loading:payLoading, error:payError,success:successPay} = templatePay
    const {Earnings, setEarnings} = React.useState(0)
    React.useEffect(()=>{
        if (successPay){
            dispatch(paidTemplate())
           // setEarnings(+ purchaseTemplate.price)
        }
    },[successPay,dispatch,setEarnings])
    console.log(Earnings)
    return (
        <div>
            <h1>{Earnings}</h1>
        </div>
    );
};

export default Earnings;