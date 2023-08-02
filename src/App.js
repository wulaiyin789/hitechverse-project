import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { initGA } from './utils/analytics';

// COMPONENTS
import Header from './components/Header/Header';
import Footer from './components/Footer';

// LAYOUTS
import HomeScreen from './layouts/HomeScreen';
import ProductScreen from './layouts/ProductScreen';
import CartScreen from './layouts/CartScreen';
import LoginScreen from './layouts/LoginScreen';
import RegisterScreen from './layouts/RegisterScreen';
import ProfileScreen from './layouts/ProfileScreen';
import ShippingScreen from './layouts/ShippingScreen';
import PaymentScreen from './layouts/PaymentScreen';
import PlaceOrderScreen from './layouts/PlaceOrderScreen';
import OrderScreen from './layouts/OrderScreen';
import UserListScreen from './layouts/UserListScreen';
import UserEditScreen from './layouts/UserEditScreen';
import ProductListScreen from './layouts/ProductListScreen';
import OrderListScreen from './layouts/OrderListScreen';

// UI
import classes from './App.module.scss';
import ProductEditScreen from './layouts/ProductEditScreen';

initGA()

const App = () => {
    return (
        <div className={classes.App}>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/order/:id' element={<OrderScreen />} />
                        <Route path='/shipping' element={<ShippingScreen />} />
                        <Route path='/payment' element={<PaymentScreen />} />
                        <Route path='/placeorder' element={<PlaceOrderScreen />} />
                        <Route path='/login' element={<LoginScreen />} />
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route path='/profile' element={<ProfileScreen />} />
                        <Route path='/product/:id' element={<ProductScreen />} />
                        <Route path='/cart'>
                            <Route path=':id' element={<CartScreen />} />
                            <Route path='' element={<CartScreen />} />
                        </Route>
                        <Route path='/admin/userlist'>
                            <Route path='' element={<UserListScreen />} />
                            <Route path=':id/edit' element={<UserEditScreen />} />
                        </Route>
                        <Route path='/admin/productlist'>
                            <Route path='' element={<ProductListScreen />} />
                            <Route path=':pageNum' element={<ProductListScreen />} />
                            <Route path=':id/edit' element={<ProductEditScreen />} />
                        </Route>
                        <Route path='/admin/orderlist'>
                            <Route path='' element={<OrderListScreen />} />
                        </Route>
                        <Route path='/'>
                            <Route path='search/:keyword' element={<HomeScreen />} />
                            <Route path='page/:pageNum' element={<HomeScreen />} />
                            <Route path='' element={<HomeScreen />} />
                        </Route>
                    </Routes>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default App;
