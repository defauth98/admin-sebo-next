import router from 'next/router';
import React, { useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import booksApi from '../services/api';

const AddBook: React.FC = () => {
  useEffect(() => {}, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit({
    title, price, publisherName, state_book, date_edition, description, book_cover,
  }) {
    try {
      const bookData = new FormData();

      bookData.append('title', title);
      bookData.append('price', price);
      bookData.append('publisherName', publisherName);
      bookData.append('state_book', state_book);
      bookData.append('date_edition', date_edition);
      bookData.append('description', description);
      bookData.append('book_cover', book_cover[0]);

      await booksApi.post('/book', bookData);
    } catch (error) {
      alert(error);
    }

    router.push('/admin');
  }

  return (
    <Container>
      <h1>Adicionar livro</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2" controlId="add.image">
          <Form.Label>Capa</Form.Label>
          <Form.Control type="file" {...register('book_cover')} />
          {errors.book_cover && <span>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-2" controlId="add.title">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" placeholder="Harry Potter" {...register('title', { required: true })} />
          {errors.title && <span>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-2" controlId="add.price">
          <Form.Label>Preço</Form.Label>
          <Form.Control type="number" placeholder="120.00" {...register('price', { required: true })} />
          {errors.price && <span>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-2" controlId="add.price">
          <Form.Label>Editora</Form.Label>
          <Form.Control type="text" placeholder="Editora do Harry Potter" {...register('publisherName', { required: true })} />
          {errors.publisher && <span>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-2" controlId="add.state">
          <Form.Label>Estado do livro</Form.Label>
          <Form.Control type="text" placeholder="Sem algumas folhas, mal estado" {...register('state_book', { required: true })} />
          {errors.state_book && <span>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-2" controlId="add.date">
          <Form.Label>Data da edição</Form.Label>
          <Form.Control type="date" {...register('date_edition', { required: true })} />
          {errors.date_edition && <span>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-2" controlId="add.descrição">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" rows={3} {...register('description', { required: true })} />
          {errors.description && <span>This field is required</span>}
        </Form.Group>
        <Form.Group className="mb-2">
          <Button type="submit">Cadastrar</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddBook;
