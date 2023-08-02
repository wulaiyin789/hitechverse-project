import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

// COMPONENTS
import Product from '../components/Product';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message';
import Paginate from '../components/Paginate/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';

// ACTIONS
import { listProducts } from '../actions/productActions';
// import GA_LOGGER from '../utils/gaLoggerHelper';
import { logPageView } from '../utils/analytics';

const HomeScreen = () => {
    const { keyword, pageNum } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;

    useEffect(() => {
        // GA_LOGGER.event('page_view', {
        //     page_title: document.title,
        //     page_location: window.location.origin,
        //     page_path: window.location.pathname
        // });
        logPageView()
        dispatch(listProducts(keyword, pageNum));
    }, [dispatch, keyword, pageNum]);

    return (
        <>
            <Meta />
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to='/' className='btn btn-light mt-3'>
                    Go Back
                </Link>
            )}
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
};

export default HomeScreen;
