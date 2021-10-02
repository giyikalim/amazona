import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_SUCCESS } from '../constants/productConstants';

export default function ProductListScreen(props) {
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;
    const dispatch = useDispatch();

    const productCreate = useSelector(state => state.productCreate);
    const { error: errorCreate, loading: loadingCreate, success: successCreate, product: productCreated } = productCreate;

    const productDelete = useSelector(state => state.productDelete);
    const { error: errorDelete, loading: loadingDelete, success: successDelete } = productDelete;

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${productCreated._id}/edit`)
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_SUCCESS });
        }
        dispatch(listProducts());
    }, [dispatch, successCreate, props.history, productCreated, successDelete])


    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));       
        }
    }
    const createHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div>
            <div className='row'>
                <h1>Products</h1>
                <button type='button' className='primary'
                    onClick={createHandler}>Create Product</button>
            </div>
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox>}

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}

            {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant='danger'></MessageBox>
                    : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id}>
                                        <td>{p._id}</td>
                                        <td>{p.name}</td>
                                        <td>{p.price}</td>
                                        <td>{p.category}</td>
                                        <td>{parseFloat.brand}</td>
                                        <td>
                                            <button type='button' className='small' onClick={() => props.history.push(`/product/${p._id}/edit`)}>
                                                Edit
                                            </button>
                                            <button type='button' className='small' onClick={() => deleteHandler(p)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
        </div>
    )
}
