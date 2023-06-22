import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');

    const navigate = useNavigate();

    const submitSearchHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <Form onSubmit={submitSearchHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products'
                className='me-sm-2 ms-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;
