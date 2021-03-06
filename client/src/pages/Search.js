import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import Book from "../components/Book";
import Card from "../components/Card";
import Form from "../components/Form";

function Search() {
  const [books, setBooks] = useState([]);
  const [bookSearch, setBookSearch] = useState("");
  const [bookObject, setBookObject] = useState({
    title: "",
    authors: "",
    description: "",
    link: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setBookSearch(value);
  };

  const handleFormSubmit = (event) => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.searchBook(bookSearch)
      .then((data) => {
        console.log(data.data.items);
        setBooks(data.data.items);
      })
      //   .then(res => setBooks(data.data.items))
      .catch((err) => console.log(err));
  };

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  //function to save book to db
  function saveBook() {
    API.saveBook({
      title: books.volumeInfo.title,
      authors: books.volumeInfo.authors,
      description: books.volumeInfo.title,
      link: books.volumeInfo.infoLink,
      image: books.volumeInfo.imageLinks.smallThumbnail,
    })
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1 className="text-center">(React) Google Books Search</h1>
            <h3 className="text-center">
              Search for and Save Books of Interest.
            </h3>
          </Jumbotron>
        </Col>
        <Col size="md-12">
          <Card title="Book Search" icon="far fa-book">
            <Form
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <Card title="Results">
            {this.state.books.length ? (
              <List>
                {this.state.books.map((book) => (
                  <Book
                    key={book.id}
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.subtitle}
                    link={book.volumeInfo.infoLink}
                    authors={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    Button={() => (
                      <button
                        onClick={() => this.handleBookSave(book.id)}
                        className="btn btn-primary ml-2"
                      >
                        Save
                      </button>
                    )}
                  />
                ))}
              </List>
            ) : (
              <h2 className="text-center">{this.state.message}</h2>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
