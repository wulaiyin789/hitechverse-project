import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import ls from 'localstorage-slim';

// REDUCERS
import {
    productCreateReducer,
    productCreateReviewReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productTopRatedReducer,
    productUpdateReducer
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
    userDeleteForAdminReducer,
    userDetailsReducer,
    userListForAdminReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateForAdminReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';
import {
    myOrderListReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListForAdminReducer,
    orderDeliverForAdminReducer,
    orderDeleteForAdminReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListForAdminReducer,
    userDelete: userDeleteForAdminReducer,
    userUpdate: userUpdateForAdminReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverForAdminReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListForAdminReducer,
    orderDelete: orderDeleteForAdminReducer
});

const cartItemsFromStorage = ls.get('cartItems')
    ? JSON.parse(ls.get('cartItems', { decrypt: true }))
    : [];

const userInfoFromStorage = ls.get('userInfo')
    ? JSON.parse(ls.get('userInfo', { decrypt: true }))
    : null;

const shippingAddressFromStorage = ls.get('shippingAddress')
    ? JSON.parse(ls.get('shippingAddress', { decrypt: true }))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevToolsDevelopmentOnly(applyMiddleware(...middleware))
);

export default store;
