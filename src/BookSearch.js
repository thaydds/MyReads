import React, { Component } from 'react'
import { Input, Container, Header, Icon } from 'semantic-ui-react'
import BookList from './BookList'


class BookSearch extends Component {
    state = {
        query: '',
        booksBySearch: undefined
    }

    updateQuery = (query) => {
		this.setState(()=> ({
			query: query.trim()
		}))
		this.props.searchBook(query.trim()).then(books => {
			this.setState(()=> ({
				booksBySearch: books
			}))
		})
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    updateBook = ( book, shelf) => {
        console.log('book', book);
        console.log('shelf', shelf);
        this.props.updateBook(book, shelf)
    }

    render() {
        const { query } = this.state;
        console.log("this.booksBySearch", this.state.booksBySearch)
        return (
            <Container style={{ marginTop: '7em' }}>
            <Input onChange={(event) => this.updateQuery(event.target.value)} size='large' fluid icon='search' placeholder='Search a book' />
            {this.state.booksBySearch !== undefined && this.state.booksBySearch.length >    0 ?
            <BookList updateBook = {this.props.teste} category="Results:" bookList ={this.state.booksBySearch} /> :
            ''
            }
            </Container>
        )
    }
}

export default BookSearch