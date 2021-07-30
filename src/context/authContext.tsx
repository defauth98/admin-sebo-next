import { createContext, Dispatch, SetStateAction, useCallback, useState } from "react";
import booksApi from "../services/api";

export interface Books {
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
  setBooks: Dispatch<SetStateAction<any[]>>; 
  email: String;
  id: Number;
  isAuthenticated: boolean;
  books: Array<Books>
}

export const authContext = createContext<IAuthContext>({} as IAuthContext)

function AuthContextProvider({children}) {
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
    <authContext.Provider value={
      {
        login, 
        email, 
        id,isAuthenticated: !email,
        books,
        setBooks,
        getBooks
      }
      }
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider;