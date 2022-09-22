import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import moment from 'moment';

// COMPONENTS
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';
import ModalDialog from '../components/ModalDialog/ModalDialog';

// ACTIONS
import { orderDeleteForAdmin, orderListForAdmin } from '../actions/orderActions';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import iconCheck from '../components/iconCheck/iconCheck';

const UserListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState();
    const [modal, setModal] = useState(false);

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const orderDelete = useSelector((state) => state.orderDelete);
    const { success: successDelete } = orderDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(orderListForAdmin());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo, successDelete]);

    const showModal = (val) => {
        setState({ selectedVal: val });
    };

    const deleteHandler = (id) => {
        setModal(false);

        // DELETE ORDER
        dispatch(orderDeleteForAdmin(id));
    };

    return (
        <>
            <h1>Orders</h1>{' '}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>PAYMENT METHOD</th>
                                <th>TOTAL PRICE</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            <div className='text-center'>
                                                {moment(order.paidAt).format('L')}
                                            </div>
                                        ) : (
                                            <div className='text-center'>
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    style={{ color: 'red' }}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td>{iconCheck(order.isDelivered)}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <div className='d-grid gap-2'>
                                                <Button className='btn' variant='light'>
                                                    DETAILS
                                                </Button>
                                            </div>
                                        </LinkContainer>
                                        <div className='d-grid gap-2'>
                                            <Button
                                                className='btn'
                                                variant='danger'
                                                onClick={() => {
                                                    showModal(order);
                                                    setModal(!modal);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {modal && (
                        <ModalDialog
                            show={modal}
                            hide={() => setModal(false)}
                            title={`Delete Order ${state.selectedVal._id}?`}
                            body={`Are you sure you want to delete ${state.selectedVal._id}?`}
                            button1='CLOSE'
                            button2='DELETE'
                            buttonClick1={() => setModal(false)}
                            buttonClick2={() => deleteHandler(state.selectedVal._id)}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default UserListScreen;
