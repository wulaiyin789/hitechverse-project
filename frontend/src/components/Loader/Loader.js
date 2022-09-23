import React from 'react';
import { Spinner } from 'react-bootstrap';

import classes from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={classes.Loader}>
            <Spinner animation='border' role='status' className={classes.Spinner}>
                <span className='sr-only'>Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
