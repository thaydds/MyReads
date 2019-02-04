import React, { Component } from 'react';
import BookList from './BookList'
import {
  Container,
  Image,
  Menu
} from 'semantic-ui-react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'

class App extends Component {
  state = {
    url: '',
    books: undefined
  }

  componentWillMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBookList = (book, shelf) => {
    console.log('oi')
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.setState({books: this.state.books})
      })
  }

  searchBook = (term) => {
    return BooksAPI.search(term)
      .then((books) => {
        return books
      }) 
  }

  render() {
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
        {this.state.books === undefined ? ''
          :
          <Route exact path='/' render={() => (
            <div>
              <Menu fixed='top' inverted>
              <Container>
              <Menu.Item as='a' header>
                <Image size='mini' src='/favicon.ico' style={{ marginRight: '1.5em' }} />
                  MyReads
                </Menu.Item>
                <Menu.Item as='a' position='right'>Search</Menu.Item>
              </Container>
            </Menu>
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
      </div>
    )
  }
}

export default App