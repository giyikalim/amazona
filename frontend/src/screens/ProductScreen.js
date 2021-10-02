import React, { useEffect, useState } from 'react'
import data from '../data'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;
    const [qty, setQty] = useState(1);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }


    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId])

    return (
        <div>
            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>
                        <Link to="/">Back to result</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large" src={product.image} alt={product.name} />
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li>
                                        <h1>{product.name}</h1>
                                    </li>
                                    <li>
                                        <Rating rating={product.rating} numReviews={product.numReviews}>

                                        </Rating>
                                    </li>
                                    <li>
                                        Price: ${product.price}
                                    </li>
                                    <li>
                                        <p>Description: {product.description}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">${product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div >
                                                    {
                                                        product.countInStock > 0 ? <span className="success">In Stock</span> :
                                                            <span className="danger">Unavaliable</span>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                        {
                                            product.countInStock && (
                                                <>
                                                    <li>
                                                        <div className='row'>
                                                            <div>Qty</div>
                                                            <div>
                                                                <select value={qty} onChange={e => { setQty(e.target.value) }}>
                                                                    {[...Array(product.countInStock).keys()].map(x => {
                                                                        return (<option key={x + 1} value={x + 1}>{x + 1}</option>)
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                    </li>
                                                </>
                                            )
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}
