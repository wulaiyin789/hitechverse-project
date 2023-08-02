import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button, Form } from 'react-bootstrap';

// COMPONENTS
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';
import FormContainer from '../components/FormContainer/FormContainer';

// ACTIONS
import { register } from '../actions/userActions';
// import GA_LOGGER from '../utils/gaLoggerHelper';
import { logPageView } from '../utils/analytics';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo: user } = userLogin;

    const redirect = new URLSearchParams(location.search).get('redirect')
        ? new URLSearchParams(location.search).get('redirect')
        : '/';

    useEffect(() => {
        // GA_LOGGER.event('page_view', {
        //     page_title: document.title,
        //     page_location: window.location.origin,
        //     page_path: window.location.pathname
        // });
        logPageView()
        if (userInfo || user) {
            navigate(redirect);
        }
    }, [navigate, redirect, user, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
        } else {
            // DISPATCH REGISTER
            setMessage('');
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? (
                <Loader />
            ) : (
                <>
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
                            Sign In
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            Got an Account?{' '}
                            <Link
                                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            >
                                Login
                            </Link>
                        </Col>
                    </Row>
                </>
            )}
        </FormContainer>
    );
};

export default RegisterScreen;
