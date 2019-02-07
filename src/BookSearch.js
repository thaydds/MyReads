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
				booksBySearch: this.updateBookSearch(books)
			}))
		})
    }

    updateBookSearch =(books) => {
        let books2 = this.props.bookList;
        console.log(books2)
        console.log(books)
        if(this.state.query === '' || books2.length === undefined || books === undefined || books.length === undefined){
            return []
        }
        else{
            let aux = books2.map( book => {
                if(books.map( b => b.id).includes(book.id)){
                    books[books.map(b2 => b2.id).indexOf(book.id)].shelf= book.shelf
                }
                return book;	
            })
        }
        return books;
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    checkDuplicate = ( book, shelf) => {
       
        const books = this.state.booksBySearch;
        const books2 = this.props.bookList;
         this.props.teste(book, shelf, books2.map( b => b.id).includes(book.id))
    
  
       
        
    }

    render() {
        return (
            <Container style={{ marginTop: '7em' }}>
                <Input value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} size='large' fluid icon='search' placeholder='Search a book' />
                {this.state.booksBySearch !== undefined && this.state.booksBySearch.length >    0 ?
                <BookList updateBook = {this.checkDuplicate} category="Results:" bookList ={this.state.booksBySearch} /> :
                ''
                }
            </Container>
        )
    }
}

export default BookSearch