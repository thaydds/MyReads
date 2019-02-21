import React, { Component } from 'react';
import BookList from './BookList'
import BookSearch from './BookSearch'
import {
  Container,
  Image,
  Menu,
  Loader
} from 'semantic-ui-react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'

class App extends Component {
  state = {
    url: '',
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBookList = (book, shelf, duplicate) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        let newBooks = this.state.books.map( b => {
          if(b.id === book.id){
             b.shelf = shelf
          }
          return b;
        })
        
        if(duplicate === true || duplicate === undefined){
          this.setState({books: newBooks});
        }
        else{
          book.shelf = shelf
          this.setState({books:[...newBooks, book]})
        }
      })
  }

  searchBook = (term) => {
    return BooksAPI.search(term)
      .then((books) => {
        return books
      }) 
  }

  render() {
   console.log('this.state.books.length', this.state.books.length);
    const bookShelfs = [
      {
        title: 'Current Reading',
        key: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        key: 'wantToRead'
      },
      {
        title: 'Read',
        key: 'read'
      },
    ]

    return (
      <div>
        <Menu fixed='top' inverted>
        <Container>
        <Menu.Item header>
          <Image size='mini' src='/favicon.ico' style={{ marginRight: '1.5em' }} />
          <Link to="/">MyReads</Link>
          </Menu.Item>
          <Menu.Item position='right'>
            <Link to="/search">Search</Link>
          </Menu.Item>
        </Container>
        </Menu>
        {this.state.books.length === 0 ? <Loader active />
          :
          <Route exact path='/' render={() => (
            <div>
            <div>
              { bookShelfs.map( shelf => {
                return (<BookList updateBook = {this.updateBookList} key={shelf.key} bookList ={this.state.books.filter( book => {
                  return book.shelf === shelf.key
                })} category={shelf.title} />)
              })} 
            </div>
            </div>
          )}>
          </Route>
      }
      <Route exact path='/search' render={() => (
            <BookSearch bookList={this.state.books} teste = {this.updateBookList} searchBook={this.searchBook} />
          )}>
          </Route>
      </div>
    )
  }
}

export default App