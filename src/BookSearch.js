import React, { Component } from 'react'
import { Input, Container} from 'semantic-ui-react'
import BookList from './BookList'
//import {DebounceInput} from 'react-debo'


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
        this.props.updateBook(book, shelf)
    }

    render() {
        return (
            <Container style={{ marginTop: '7em' }}>
                <Input value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} size='large' fluid icon='search' placeholder='Search a book' />
                {this.state.booksBySearch !== undefined && this.state.booksBySearch.length >    0 ?
                <BookList updateBook = {this.props.teste} category="Results:" bookList ={this.state.booksBySearch} /> :
                ''
                }
            </Container>
        )
    }
}

export default BookSearch