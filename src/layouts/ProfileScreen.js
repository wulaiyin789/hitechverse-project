import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Row, Button, Form, Table } from 'react-bootstrap';
import moment from 'moment';

// COMPONENTS
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// ACTIONS
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getMyOrderList } from '../actions/orderActions';
import GA_LOGGER from '../utils/gaLoggerHelper';
// import { logPageView } from '../utils/analytics';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const myOrderList = useSelector((state) => state.myOrderList);
    const { loading: loadingOrders, error: errorOrders, orders } = myOrderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const redirect = new URLSearchParams(location.search).get('redirect')
        ? new URLSearchParams(location.search).get('redirect')
        : '/';

    useEffect(() => {
        GA_LOGGER.event('page_view', {
            page_title: document.title,
            page_location: window.location.origin,
            page_path: window.location.pathname
        });
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
                dispatch(getMyOrderList());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, redirect, user, userInfo, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
        } else {
            // DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>✨ Profile Updated ✨</Message>}
                {loading ? (
                    <Loader />
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='mb-3' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{moment(order.createdAt).format('LL')}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            moment(order.paidAt).format('LL')
                                        ) : (
                                            <div className='text-center'>
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    style={{ color: 'red' }}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            moment(order.deliveredAt).format('LL')
                                        ) : (
                                            <div className='text-center'>
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    style={{ color: 'red' }}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <div className='d-grid gap-2'>
                                                <Button className='btn' variant='light'>
                                                    Details
                                                </Button>
                                            </div>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
