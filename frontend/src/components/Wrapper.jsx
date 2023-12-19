import React from "react";
import { Container } from "react-bootstrap";

const Wrapper = ( { children } ) => {

    return(
        <Container className='mt-3 mb-3'>
            { children }
        </Container>
    )
}

export default Wrapper;