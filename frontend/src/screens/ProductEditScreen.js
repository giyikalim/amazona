import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { productListReducer } from '../reducers/productReducers';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');

    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;

    const dispatch = useDispatch();

    const productUpdate = useSelector(state => state.productUpdate);
    const { error: updateError, loading: updateLoading, success: udpateSuccess } = productUpdate;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            category,
            price,
            brand,
            description,
            image,
            countInStock
        }));
    }


    useEffect(() => {
        if (udpateSuccess) {
            props.history.push('/productList');
        }

        if (!product || product._id !== productId || udpateSuccess) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setImage(product.image);
            setPrice(product.price);
            setCategory(product.category);
            setBrand(product.brand);
            setDescription(product.description);
            setCountInStock(product.countInStock);
        }
    }, [dispatch, product, productId, udpateSuccess])

    const [errorUpload, setErrorUpload] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);

    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);

        try {
            const { data } = await axios.post('/api/uploads', bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                })
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product</h1>
                </div>
                {updateLoading && <LoadingBox />}
                {updateError && <MessageBox variant='danger'>{updateError}</MessageBox>}
                {
                    loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> :
                        <>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} placeholder='Enter name'></input>
                            </div>
                            <div>
                                <label htmlFor='image'>Image</label>
                                <input type='text' id='image' value={image} onChange={e => setImage(e.target.value)} placeholder='Enter image'></input>
                            </div>
                            <div>
                                <label htmlFor='imageFile'>Image File</label>
                                <input type='file' id='imageFile' onChange={uploadFileHandler} label='Choose Image'></input>
                                {
                                    loadingUpload && (<LoadingBox></LoadingBox>)
                                }
                                {
                                    errorUpload && (<MessageBox variant='danger'>{errorUpload}</MessageBox>)
                                } </div>
                            <div>
                                <label htmlFor='price'>Price</label>
                                <input type='text' id='price' value={price} onChange={e => setPrice(e.target.value)} placeholder='Enter price'></input>
                            </div>
                            <div>
                                <label htmlFor='category'>Category</label>
                                <input type='text' id='category' value={category} onChange={e => setCategory(e.target.value)} placeholder='Enter category'></input>
                            </div>
                            <div>
                                <label htmlFor='brand'>Brand</label>
                                <input type='text' id='brand' value={brand} onChange={e => setBrand(e.target.value)} placeholder='Enter brand'></input>
                            </div>
                            <div>
                                <label htmlFor='description'>Description</label>
                                <textarea rows='3' type='text' id='description' value={description} onChange={e => setDescription(e.target.value)} placeholder='Enter description'>
                                </textarea>
                            </div>
                            <div>
                                <label />
                                <button type='submit' className='primary'>Update</button>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}
