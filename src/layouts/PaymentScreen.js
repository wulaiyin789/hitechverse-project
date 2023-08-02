import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form } from 'react-bootstrap';

// COMPONENTS
import FormContainer from '../components/FormContainer/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';

// ACTIONS
import { savePaymentMethod } from '../actions/cartActions';
// import GA_LOGGER from '../utils/gaLoggerHelper';
import { logPageView } from '../utils/analytics';

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // GA_LOGGER.event('page_view', {
    //     page_title: document.title,
    //     page_location: window.location.origin,
    //     page_path: window.location.pathname
    // });
    logPageView()
    if (!shippingAddress) {
        navigate('/shipping');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Pay
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
