import { createContext, useCallback, useState } from "react";
import booksApi from "../services/api";

interface Books {
  title: String;
  description: String;
  price: String;
  publisher: String;
  state_book: String;
  date_edition: String;
  id: Number
}

interface IAuthContext {
  login: (email: String, password: String) => void;
  getBooks: () => void;
  email: String;
  id: Number;
  isAuthenticated: boolean;
  books: Array<Books>
}

export const authContext = createContext<IAuthContext>({} as IAuthContext)

function AuthContextProvider({children}) {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [books, setBooks] = useState([])

  async function login(email: String, password: String) {
    const response = await booksApi.post('/login', {email, password});

    if(response.status === 200) {
      const {email, id} =  response.data?.user;
      const {token} = response.data;

      booksApi.defaults.headers.common = {'Authorization': `bearer ${token}`}

      setEmail(email);
      setId(id);
      setisAuthenticated(true);
    }
  }

  const getBooks = useCallback(async () => {
    const request = await booksApi.get('/book');

    const books = request.data;

    if (books.length > 0) {
      console.log(books)
      setBooks(books)
    }

    
  }, [])

  return (  
    <authContext.Provider value={{login, email, id,isAuthenticated, books, getBooks}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider;