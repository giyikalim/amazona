import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps'

export default function ShippingAddressComponent(props) {
    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;
    if (!userInfo) {
        props.history.push('/signin');
    }
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }));
        props.history.push('/payment');
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input type='text' id='fullName' value={fullName}
                        onChange={e => setFullName(e.target.value)} required
                        placeholder='Enter full name'>
                    </input>
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input type='text' id='address' value={address}
                        onChange={e => setAddress(e.target.value)} required
                        placeholder='Enter address'>
                    </input>
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' value={city}
                        onChange={e => setCity(e.target.value)} required
                        placeholder='Enter city'>
                    </input>
                </div>
                <div>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input type='text' id='postalCode' value={postalCode}
                        onChange={e => setPostalCode(e.target.value)} required
                        placeholder='Enter postal code'>
                    </input>
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input type='text' id='country' value={country}
                        onChange={e => setCountry(e.target.value)} required
                        placeholder='Enter country'>
                    </input>
                </div>
                <div>
                    <button type='submit' className='primary'>Continue</button>
                </div>
            </form>
        </div>
    )
}
