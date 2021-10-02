import './index.css';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressComponent from './components/ShippingAddressComponent';
import PaymentMethodScreen from './components/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">Amazona</Link>
          </div>

          <div>
            <Link to="/cart">
              Cart
              {
                cartItems.length > 0 && (
                  <span className='badge'>{cartItems.length}</span>
                )
              }
            </Link>
            {
              userInfo ?
                (
                  <div className='dropdown'>
                    <Link to='#' >{userInfo.name}
                      <i className='fa fa-caret-down'></i></Link>
                    <ul className='dropdown-content'>
                      <li>
                        <Link to='/profile'>User Profile</Link>
                      </li>
                      <li>
                        <Link to='/orderhistory'>Order History</Link>
                      </li>
                      <li>
                        <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
                      </li>
                    </ul>
                  </div>
                )
                : <Link to="/signin">Sign In</Link>
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className='dropdown'>
                  <Link to='#admin'>Admin <i className='fa fa-caret-down'></i></Link>
                  <ul className='dropdown-content'>
                    <li>
                      <Link to='/dashboard'>Dashboard</Link>
                    </li>
                    <li>
                      <Link to='/productList'>Products</Link>
                    </li>
                    <li>
                      <Link to='/orderList'>Orders</Link>
                    </li>
                    <li>
                      <Link to='/userList'>Users</Link>
                    </li>
                  </ul>
                </div>
              )
            }

          </div>

        </header>

        <main>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path='/shipping' component={ShippingAddressComponent}></Route>
          <Route path='/payment' component={PaymentMethodScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/orderhistory' component={OrderHistoryScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
          <AdminRoute path='/productList' component={ProductListScreen}></AdminRoute>
          <AdminRoute path='/orderList' component={OrderListScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <footer className="row center">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
