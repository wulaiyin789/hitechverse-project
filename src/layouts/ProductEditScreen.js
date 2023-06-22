import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

// COMPONENTS
import Message from '../components/Message/Message';
import Loader from '../components/Loader/Loader';
import FormContainer from '../components/FormContainer/FormContainer';

// ACTIONS
import { listProductDetails, updateProduct } from '../actions/productActions';
import {
    PRODUCT_UPDATE_RESET,
    PRODUCT_DETAILS_RESET
} from '../constants/productConstants';

const ProductEditScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch({ type: PRODUCT_DETAILS_RESET });
            navigate('/admin/productlist');
        } else {
            if (!product.name || product._id !== id) {
                dispatch(listProductDetails(id));
            } else {
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setImage(product.image);
            }
        }
    }, [dispatch, id, navigate, product, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();

        // UPDATE PRODUCT
        dispatch(
            updateProduct(id, {
                _id: id,
                name,
                description,
                price,
                brand,
                category,
                countInStock,
                image
            })
        );
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (err) {
            console.log(err);
            setUploading(false);
        }
    };

    return (
        <>
            <Link to='/admin/productList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product ({product._id})</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

                            <Form.Group className='mb-3' controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter Price Value'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Image URL'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                                <Form.Control
                                    type='file'
                                    label='Choose an image file'
                                    accept='image/jpg, image/jpeg, image/png'
                                    onChange={uploadFileHandler}
                                ></Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Brand Name'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='countInStock'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter Price Value'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    </>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
