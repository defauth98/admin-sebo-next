import React, { useContext, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import Link from 'next/link';

import BookCard from '../components/BookCard';
import { authContext, Books } from '../context/authContext';

import booksApi from '../services/api';

interface AdminProps {
  ServerSideBooks: Array<Books>
}

const Admin: React.FC<AdminProps> = ({ ServerSideBooks }) => {
  const {
    email, getBooks, books, setBooks,
  } = useContext(authContext);

  useEffect(() => {
    if (ServerSideBooks.length > 0) {
      setBooks(ServerSideBooks);
      return;
    }

    getBooks();
  }, [getBooks, ServerSideBooks, setBooks]);

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
          {books.length >= 1 && books.map((book) => <BookCard key={String(book.id)} book={book} />)}
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
