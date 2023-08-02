import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import moment from 'moment';

// COMPONENTS
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';
// import GA_LOGGER from '../utils/gaLoggerHelper';
import { logPageView } from '../utils/analytics';

// ACTIONS
import { deliverOrder, getOrderDetails } from '../actions/orderActions';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // const orderPay = useSelector((state) => state.orderPay);
    // const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    useEffect(() => {
        // GA_LOGGER.event('page_view', {
        //     page_title: document.title,
        //     page_location: window.location.origin,
        //     page_path: window.location.pathname
        // });
        logPageView()
        if (!userInfo) {
            navigate('/login');
        }

        if (!order || order._id !== id || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, id, navigate, order, successDeliver, userInfo]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}
                                    </p>
                                    <p>
                                        <a href={`mailto:${order.user.email}`}>
                                            <strong>Email: </strong> {order.user.email}
                                        </a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address},{' '}
                                        {order.shippingAddress.city},{' '}
                                        {order.shippingAddress.postalCode},{' '}
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Message variant='success'>
                                            Delivered on {moment(order.deliveredAt).format('llll')}
                                        </Message>
                                    ) : (
                                        <Message variant='danger'>Not Delivered</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>
                                            Paid on {moment(order.paidAt).format('llll')}
                                        </Message>
                                    ) : (
                                        <Message variant='danger'>Not Paid</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>Order is empty!</Message>
                                    ) : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item) => (
                                                <ListGroup.Item key={item.product}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link
                                                                to={`/product/${item.product}`}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} ={' '}
                                                            {item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <span className='fw-bold'>Total</span>
                                            </Col>
                                            <Col>
                                                <span className='fw-bold'>
                                                    ${order.totalPrice}
                                                </span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* <ListGroup.Item>
                                        <div className='d-grid gap-2'>
                                            <Button
                                                type='button'
                                                className='btn'
                                                disabled={order.orderItems === 0}
                                                onClick={placeOrderHandler}
                                            >
                                                Place Order
                                            </Button>
                                        </div>
                                    </ListGroup.Item> */}

                                    {loadingDeliver && <Loader />}
                                    {userInfo &&
                                        userInfo.isAdmin &&
                                        order.isPaid &&
                                        !order.isDelivered && (
                                            <ListGroup.Item>
                                                <div className='d-grid gap-2'>
                                                    <Button
                                                        type='button'
                                                        className='btn'
                                                        onClick={deliverHandler}
                                                    >
                                                        Mark as Delivered
                                                    </Button>
                                                </div>
                                            </ListGroup.Item>
                                        )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default OrderScreen;
