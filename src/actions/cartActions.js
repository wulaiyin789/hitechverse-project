import axios from 'axios';
import ls from 'localstorage-slim';

// CONSTANTS
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });

    ls.set('cartItems', JSON.stringify(getState().cart.cartItems), { encrypt: true });
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });

    ls.set('cartItems', JSON.stringify(getState().cart.cartItems), { encrypt: true });
};

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    });

    ls.set('shippingAddress', JSON.stringify(data), { encrypt: true });
};

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    });

    ls.set('paymentMethod', JSON.stringify(data), { encrypt: true });
};