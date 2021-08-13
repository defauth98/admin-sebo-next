import React, { useContext, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import Link from 'next/link';

import BookCard from '../components/BookCard';
import { authContext, Books } from '../context/authContext';

import booksApi from '../services/api';

interface AdminProps {
  ServerSideBooks: Array<Books>
}

const Admin: React.FC<AdminProps> = () => {
  const {
    email, getBooks, books,
  } = useContext(authContext);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  async function handleDelete(id: String) {
    await booksApi.delete(`/book/${id}`);

    getBooks();
  }

  return (
    <Container>
      <h1>Admin Page</h1>
      <span>{email}</span>

      <Link href="/addBook">
        adicionar
      </Link>

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
