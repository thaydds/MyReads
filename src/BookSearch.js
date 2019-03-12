import React, { Component } from 'react'
import { Input, Container, Loader} from 'semantic-ui-react'
import BookList from './BookList'
import {DebounceInput} from 'react-debounce-input'


class BookSearch extends Component {
    state = {
        query: '',
        booksBySearch: undefined
    }

    updateQuery = (query) => {
		this.setState(()=> ({
			query: query
		}))
		this.props.searchBook(query.trim()).then(books => {
			this.setState(()=> ({
				booksBySearch: this.updateBookSearch(books)
			}))
		})
    }

    updateBookSearch =(books) => {
        let booksClone = this.props.bookList;
        if(this.state.query === '' || booksClone.length === undefined || books === undefined || books.length === undefined){
            return []
        }
        else{

            booksClone.forEach(book => {
               if(books.find(b => b.id ==- book.id)){
                books[books.map(b2 => b2.id)
                    .indexOf(book.id)].shelf= book.shelf
               } 
            });
        }
        return books;
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    updateBooks = (book, shelf) => {
        const books = this.state.booksBySearch;
        const booksClone = this.props.bookList;
        this.props.teste(book, shelf, booksClone.map( b => b.id).includes(book.id))
        books[books.map(b => b.id).indexOf(book.id)].shelf= shelf
        this.setState( () => ({
            booksBySearch: books
        }))
            
    }

    render() {
        return (
            <Container style={{ marginTop: '7em' }}>
                <Input 
                size='large' fluid 
                icon='search' 
                placeholder='Search a book' 
                input={ <DebounceInput
                    minLength={3}
                    debounceTimeout={100}
                    onChange={(event) => this.updateQuery(event.target.value)} 
                    placeholder='Search a book'
                    value={this.state.query}/>}/>
                {this.state.booksBySearch !== undefined && this.state.booksBySearch.length >    0 ?
                <BookList updateBook = {this.updateBooks} category="Results:" bookList ={this.state.booksBySearch} /> :
                ''
                }
            </Container>
        )
    }
}

export default BookSearch