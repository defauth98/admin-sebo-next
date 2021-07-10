import { createContext, useState } from "react";
import booksApi from "../services/api";

export const authContext = createContext({
  login:(email: String, password: String) => {},
  email:'',
  id:0,
  isAuthenticated:false
  })

function AuthContextProvider({children}) {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);

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

  return (  
    <authContext.Provider value={{login, email, id,isAuthenticated}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider;