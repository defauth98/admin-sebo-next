import router from "next/router";
import { useContext, useEffect } from "react";
import BookCard from "../components/BookCard";
import { authContext, Books } from "../context/authContext";
import booksApi from "../services/api";

interface AdminProps {
  ServerSideBooks: Array<Books>
}

const Admin: React.FC<AdminProps> = (props) => {
  const { email, getBooks, books, setBooks } = useContext(authContext);

  useEffect(() => {
    if(props.ServerSideBooks.length > 0){
      setBooks(props.ServerSideBooks)
      return;
    }

    getBooks();
  }, [getBooks,props.ServerSideBooks, setBooks])

  return (
    <main>
      <h1>Admin Page</h1>
      <span>{email}</span>

      <ul>
        {books.map(book => <BookCard key={String(book.id)} book={book}/>)}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const request = await booksApi.get('/book');

  const ServerSideBooks = request.data;

  return {
    props: {
      ServerSideBooks,
    },
  }
}


export default Admin;