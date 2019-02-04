import React from 'react'
import {Card, Image, Button, Rating, Header, Icon, Dropdown} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Twitter } from 'react-social-sharing'


const BookCard = (props) => {
    return(
      <Card>
        <Card.Content>
          <Card.Header textAlign='center'  style={{ marginBottom : '0.7em', height: 20, fontSize: 15  }}>{props.book.title}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Image style={{width:100, height: 160}} floated='left' src={props.book.imageLinks.smallThumbnail} />
          <Card.Meta  style={{fontSize: 14}}>
              <Header as='h5'>Authors:</Header>
              {props.book.authors.map( author => {
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
          <Rating icon='star' defaultRating={5} maxRating={5} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
          <Dropdown text='Share' floating labeled button icon='share' className='icon'>
            <Dropdown.Menu>
              <Dropdown.Header content='Social Media' />
              <Dropdown.Divider />
              <Dropdown.Item content={<Twitter solidcircle medium message="I am so cool" link="http://sharingbuttons.io"/>} icon='facebook square'  text='Facebook' />
              <Dropdown.Item icon='twitter square' text='Twitter' />
              <Dropdown.Item icon='google plus square' text='Google' />
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown text='Move' floating labeled button icon='move' className='icon'>
            <Dropdown.Menu>
              <Dropdown.Header content='Shelf' />
              <Dropdown.Divider />
              <Dropdown.Item onClick={(e, { value }) => props.updateBook(props.book, value)} value="currentlyReading" icon='book' selected={props.book.shelf === 'currentlyReading' ? true : false} text='Currently Reading' />
              <Dropdown.Item onClick={(e, { value }) => props.updateBook(props.book, value)} value="wantToRead" icon='book' selected={props.book.shelf === 'wantToRead' ? true : false} text='Want To Read' />
              <Dropdown.Item onClick={(e, { value }) => props.updateBook(props.book, value)} value="read" icon='book' selected={props.book.shelf === 'read' ? true : false} text='Read' />
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
