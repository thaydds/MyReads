import React, { Component } from 'react'
import { Input, Container } from 'semantic-ui-react'

class BookSearch extends Component {
    state = {
        query: ''
    }
    render() {
        return (
            <Container style={{ marginTop: '7em' }}>
            <Input size='large' fluid icon='search' placeholder='Search a book' />
            </Container>
        )
    }
}

export default BookSearch