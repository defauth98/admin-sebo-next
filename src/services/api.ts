import axios from 'axios';

const booksApi = axios.create({
  baseURL: 'http://localhost:3333/',
});

export default booksApi;
