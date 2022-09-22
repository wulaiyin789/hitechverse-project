import React from 'react';
import PropTypes from 'prop-types';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

// UI
import classes from './Rating.module.scss'

const Rating = ({ value, text, color }) => {
    return (
        <div className={classes.Rating}>
            <span>
                <FontAwesomeIcon
                    style={{ color: color }}
                    icon={value >= 1 ? faStar : value >= 0.5 ? faStarHalfAlt : farStar}
                />
            </span>
            <span>
                <FontAwesomeIcon
                    style={{ color: color }}
                    icon={value >= 2 ? faStar : value >= 1.5 ? faStarHalfAlt : farStar}
                />
            </span>
            <span>
                <FontAwesomeIcon
                    style={{ color: color }}
                    icon={value >= 3 ? faStar : value >= 2.5 ? faStarHalfAlt : farStar}
                />
            </span>
            <span>
                <FontAwesomeIcon
                    style={{ color: color }}
                    icon={value >= 4 ? faStar : value >= 3.5 ? faStarHalfAlt : farStar}
                />
            </span>
            <span>
                <FontAwesomeIcon
                    style={{ color: color }}
                    icon={value >= 5 ? faStar : value >= 4.5 ? faStarHalfAlt : farStar}
                />
            </span>
            <span>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    value: 0,
    color: '#F8E825'
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string,
    color: PropTypes.string
};

export default Rating;
