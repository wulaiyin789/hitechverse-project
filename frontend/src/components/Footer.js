import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; Hi-Techverse</Col>
                </Row>
                <Row>
                    <Col className='text-center py-3'>Made with ❤️ by Peter Wu</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
