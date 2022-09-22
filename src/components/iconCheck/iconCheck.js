import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const iconCheck = (check) => {
    return (
        <>
            {check ? (
                <div className='text-center'>
                    <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                </div>
            ) : (
                <div className='text-center'>
                    <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                </div>
            )}
        </>
    );
};

export default iconCheck;
