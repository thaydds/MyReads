import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Message} from 'semantic-ui-react'
import Slider from "react-slick";

import {
    Container,
    Header,
    Icon
  } from 'semantic-ui-react'
import BookCard from './BookCard';

class BookList extends Component {
    updateBook = ( book, shelf) => {
        this.props.updateBook(book, shelf)
    }
    render() {
        return (
            <div>
            <Container style={{ marginTop: '7em' }}>
            <Header as='h3'><Icon circular name='book'/>{this.props.category}</Header>
            {this.props.bookList.length === 0 ?
            <Message negative>
                <Message.Header>No book to show</Message.Header>
                <p>move some book to here ;)</p>
            </Message>:
                <Card.Group>
                {this.props.bookList.map (book => {
                    return (<BookCard key={book.id} book={book} updateBook={this.updateBook}  />)
                })}
            </Card.Group>        
            }
            </Container>
            </div>
        )
    } 
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired

}

export default BookList;