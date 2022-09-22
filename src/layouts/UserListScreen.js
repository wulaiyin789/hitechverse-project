import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';

// COMPONENTS
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';
import ModalDialog from '../components/ModalDialog/ModalDialog';

// ACTIONS
import { userListForAdmin, userDeleteForAdmin } from '../actions/userActions';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import iconCheck from '../components/iconCheck/iconCheck';

const UserListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState();
    const [modal, setModal] = useState(false);

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(userListForAdmin());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo, successDelete]);

    const showModal = (val) => {
        setState({ selectedVal: val });
    };

    const deleteHandler = (id) => {
        setModal(false);

        // DELETE USER
        dispatch(userDeleteForAdmin(id));
    };

    return (
        <>
            <h1>Users</h1>{' '}
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
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <a href={`mailto=${user.email}`}>{user.email}</a>
                                    </td>
                                    <td>{iconCheck(user.isAdmin)}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/userlist/${user._id}/edit`}
                                        >
                                            <div className='d-grid gap-2'>
                                                <Button className='btn' variant='light'>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </div>
                                        </LinkContainer>
                                        <div className='d-grid gap-2'>
                                            <Button
                                                className='btn'
                                                variant='danger'
                                                onClick={() => {
                                                    showModal(user);
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
                            title={`Delete User ${state.selectedVal._id}?`}
                            body={`Are you sure you want to delete ${state.selectedVal.name}?`}
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
