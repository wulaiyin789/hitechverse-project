import { Button, Modal } from 'react-bootstrap';

import classes from './ModalDialog.module.scss';

const ModalDialog = ({ show, hide, title, body, button1, button2, buttonClick1, buttonClick2 }) => {
    return (
        <div className={classes.Modal}>
            <div className={classes.Backdrop} />
            <Modal show={show} onHide={hide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{body}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={buttonClick1}>{button1}</Button>
                    <Button variant='danger' onClick={buttonClick2}>{button2}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalDialog;
