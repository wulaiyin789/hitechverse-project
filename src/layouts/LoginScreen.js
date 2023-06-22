import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button, Form } from 'react-bootstrap';

// COMPONENTS
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';
import FormContainer from '../components/FormContainer/FormContainer';

// ACTIONS
import { login } from '../actions/userActions';
import GA_LOGGER from '../utils/gaLoggerHelper';
// import { logPageView } from '../utils/analytics';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = new URLSearchParams(location.search).get('redirect')
        ? new URLSearchParams(location.search).get('redirect')
        : '/';

    useEffect(() => {
        GA_LOGGER.event('page_view', {
            page_title: document.title,
            page_location: window.location.origin,
            page_path: window.location.pathname
        });
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        // DISPATCH LOGIN
        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Form onSubmit={submitHandler}>
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

                        <Button type='submit' variant='primary'>
                            Sign In
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            New Customer?{' '}
                            <Link
                                to={
                                    redirect
                                        ? `/register?redirect=${redirect}`
                                        : '/register'
                                }
                            >
                                Register
                            </Link>
                        </Col>
                    </Row>
                </>
            )}
        </FormContainer>
    );
};

export default LoginScreen;
