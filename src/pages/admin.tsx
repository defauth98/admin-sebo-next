import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Container, Form, Table,
} from 'react-bootstrap';
import Link from 'next/link';

import BookCard from '../components/BookCard';
import { authContext, Books } from '../context/authContext';

import booksApi from '../services/api';

interface AdminProps {
  ServerSideBooks: Array<Books>
}

const Admin: React.FC<AdminProps> = () => {
  const {
    email, getBooks, books, search,
  } = useContext(authContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  async function handleDelete(id: String) {
    await booksApi.delete(`/book/${id}`);

    getBooks();
  }

  function handleSearch({ bookTitle }) {
    search({ title: String(bookTitle) });
  }

  return (
    <Container>
      <div>
        <h1 className="mt-2 mb-2">Admin Page</h1>
        <span>{email}</span>
      </div>

      <Form onSubmit={handleSubmit(handleSearch)} className="mt-2 mb-2">
        <Form.Group className="mb-2" controlId="bookTitle">
          <Form.Label>Buscar do título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Harry Potter"
            {...register('bookTitle', { required: true })}
          />
          {errors.bookTitle && <span>This field is required</span>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Preço</th>
            <th>Editora</th>
            <th>Estado do livro</th>
            <th>Data da edição</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          {books.length >= 1 && books.map((book) => (
            <BookCard
              key={String(book.id)}
              book={book}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>

      <Link href="/addBook">
        <Button type="submit" variant="primary">Cadastrar livro</Button>
      </Link>
    </Container>
  );
};

export async function getStaticProps() {
  const request = await booksApi.get('/book');

  const ServerSideBooks = request.data;

  return {
    props: {
      ServerSideBooks,
    },
  };
}

export default Admin;
