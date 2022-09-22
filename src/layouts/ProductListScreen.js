import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Row, Col } from 'react-bootstrap';

// COMPONENTS
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';
import ModalDialog from '../components/ModalDialog/ModalDialog';
import Paginate from '../components/Paginate/Paginate';

// ACTIONS
import { listProducts, createProduct, deleteProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductListScreen = () => {
    const { pageNum } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState();
    const [modal, setModal] = useState(false);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }

        if (successCreate) {
            navigate(`/admin/productlist/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts('', pageNum));
        }
    }, [
        dispatch,
        navigate,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        pageNum
    ]);

    const showModal = (val) => {
        setState({ selectedVal: val });
    };

    const deleteHandler = (id) => {
        setModal(false);

        // DELETE PRODUCT
        dispatch(deleteProduct(id));
    };

    const createProductHandler = () => {
        // CREATE PRODUCT
        dispatch(createProduct());
    };

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <div className='text-center'>
                            <FontAwesomeIcon icon={faPlus} /> CREATE PRODUCT
                        </div>
                    </Button>
                </Col>
            </Row>

            {modal && (
                <ModalDialog
                    show={modal}
                    hide={() => setModal(false)}
                    title={`Delete Product ${state.selectedVal._id}?`}
                    body={`Are you sure you want to delete ${state.selectedVal.name}?`}
                    button1='CLOSE'
                    button2='DELETE'
                    buttonClick1={() => setModal(false)}
                    buttonClick2={() => deleteHandler(state.selectedVal._id)}
                />
            )}
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/productlist/${product._id}/edit`}
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
                                                    showModal(product);
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
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    );
};

export default ProductListScreen;
