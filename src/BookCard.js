import React from 'react'
import {Card, Image, Rating, Header, Dropdown} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const sharing = (msg, socialMedia) =>{ 
  let finalUrl;
  if( socialMedia === 'twitter'){
  finalUrl = `https://twitter.com/intent/tweet/?text=${msg.split(' ').join('%20')}&url=http%3A%2F%2Fhttp://sharingbuttons.io` 
  }
  else if( socialMedia === 'telegram') {
  finalUrl = `https://telegram.me/share/url?text=${msg.split(' ').join('+')}&url=http%3A%2F%2Fsharingbuttons.io`
  }
  else{
  finalUrl = 'https://plus.google.com/share?url=http%3A%2F%2Fsharingbuttons.io'
  }
  window.open(finalUrl, sharing);
}

const BookCard = (props) => {
    return(
      <Card>
        <Card.Content>
          <Card.Header textAlign='center'  style={{ marginBottom : '0.7em', height: 20, fontSize: 15  }}>{props.book.title}</Card.Header>
        </Card.Content>
        <Card.Content>
          {props.book.imageLinks.smallThumbnail === undefined ? '' : <Image style={{width:100, height: 160}} floated='left' src={props.book.imageLinks.smallThumbnail} />}
          
          <Card.Meta  style={{fontSize: 14}}>
              <Header as='h5'>Authors:</Header>
              {props.book.authors === undefined ?
              'not found':
                props.book.authors.map( author => {
                  return author
              })}
          </Card.Meta>
          <Card.Meta style={{fontSize: 14}}>
            <Header as='h5'>Publisher:</Header>
            {props.book.publisher === undefined ? 'not found' : props.book.publisher}
            </Card.Meta>
          <Card.Meta  style={{fontSize: 14}}>
          <Header as='h5'>Pages:</Header>
          {props.book.publisher === undefined ? 'not found' : props.book.pageCount }
          </Card.Meta>
          <Card.Meta floated='right' style={{fontSize: 14}}>
          <Header as='h5'>PublishedYear:</Header>
          {props.book.publishedDate === undefined ? 'not found' : props.book.publishedDate.substring(0,4) }
          </Card.Meta>
          <Card.Description>
          <Rating disabled icon='star' defaultRating={Math.ceil(props.book.averageRating)} maxRating={5} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
          <Dropdown text='Share' floating labeled button icon='share' className='icon'>
            <Dropdown.Menu>
              <Dropdown.Header content='Social Media' />
              <Dropdown.Divider />
              <Dropdown.Item onClick={(e, { value }) => sharing(`I ${props.book.shelf} ${props.book.title}`, value)} value='telegram' icon='telegram'  text='Telegram' />
              <Dropdown.Item onClick={(e, { value }) => sharing(`I ${props.book.shelf} ${props.book.title}`, value)} value='twitter' icon='twitter square' text='Twitter' />
              <Dropdown.Item onClick={(e, { value }) => sharing(`I ${props.book.shelf} ${props.book.title}`, value)} icon='google plus square' text='Google' />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown text='Move' floating labeled button icon='move' className='icon'>
            <Dropdown.Menu>
              <Dropdown.Header content='Shelf' />
              <Dropdown.Divider />
              <Dropdown.Item onClick={(e, { value }) => props.updateBook(props.book, value)} value="currentlyReading" icon='book' selected={props.book.shelf === 'currentlyReading' ? true : false} text='Currently Reading' />
              <Dropdown.Item onClick={(e, { value }) => props.updateBook(props.book, value)} value="wantToRead" icon='book' selected={props.book.shelf === 'wantToRead' ? true : false} text='Want To Read' />
              <Dropdown.Item onClick={(e, { value }) => props.updateBook(props.book, value)} value="read" icon='book' selected={props.book.shelf === 'read' ? true : false} text='Read' />
              <Dropdown.Item onClick={(e, { value }) => props.updateBook(props.book, value)} value="none" icon='book' selected={props.book.shelf === undefined ? true : false} text='None' />
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </Card.Content>
      </Card>               
      )    
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
}

export default BookCard;
