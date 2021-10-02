import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

export default function PaymentMethodScreen(props) {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod());
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <form onSubmit={submitHandler} className='form'>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type='radio' required id='paypal' value='PayPal' name='paymentMethod'
                            onChange={e => setPaymentMethod(e.target.value)} checked></input>
                        <label htmlFor='paypal'>PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type='radio' required id='stripe' value='Stripe' name='paymentMethod'
                            onChange={e => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor='stripe'>Stripe</label>
                    </div>
                </div>
                <div>
                    <button className='primary' type='submit'>Continue</button>
                </div>

            </form>
        </div>
    )
}
