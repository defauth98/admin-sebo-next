import router from "next/router";
import { useContext, useEffect } from "react";
import BookCard from "../components/BookCard";
import { authContext } from "../context/authContext";

const Admin: React.FC = () => {
  const { email, isAuthenticated, getBooks, books } = useContext(authContext);

  useEffect(() => {
    isAuthenticated === false ? router.push('/') : null;
  }, [isAuthenticated])

  useEffect(() => {
    getBooks()
  }, [getBooks])

  return (
    <main>
      <h1>Admin PAge</h1>
      <span>{email}</span>

      <ul>
        {books.map(book => <BookCard key={String(book.id)} book={book}/>)}
      </ul>
    </main>
  );
}

export default Admin;