import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthContextProvider from '../context/authContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
