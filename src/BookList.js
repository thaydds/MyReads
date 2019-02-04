import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card} from 'semantic-ui-react'

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
        //console.log(typeof(this.props.bookList))
        console.log(this.props)
        return (
            <div>
            <Container style={{ marginTop: '7em' }}>
            <Header as='h3'><Icon circular name='book'/>{this.props.category}</Header>
            <Card.Group>
                {this.props.bookList.map (book => {
                    return (<BookCard key={book.id} book={book} updateBook={this.updateBook}  />)
                })}
            </Card.Group>
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