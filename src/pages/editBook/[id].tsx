import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import booksApi from '../../services/api';

const EditBook: React.FC = () => {
  const router = useRouter();

  const [savedBook, setSavedBook] = useState(null);

  useEffect(() => {
    async function getBook() {
      const { id } = router.query;

      if (id) {
        const book = await booksApi.get(`/book/${id}`);
        setSavedBook(book.data.book);
      }
    }

    getBook();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit({
    title, price, publisherName, state_book, date_edition, description, book_cover,
  }) {
    const { id } = router.query;

    if (id) {
      try {
        const bookData = new FormData();

        bookData.append('title', title);
        bookData.append('price', price);
        bookData.append('publisherName', publisherName);
        bookData.append('state_book', state_book);
        bookData.append('date_edition', date_edition);
        bookData.append('description', description);
        bookData.append('book_cover', book_cover[0]);

        await booksApi.put(`/book/${id}`, bookData);
      } catch (error) {
        alert(error);
      }

      router.push('/admin');
    }
  }

  return (
    <Container>
      <h1>Editar livro</h1>
      {
        savedBook && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2" controlId="add.image">
              <Form.Label>Capa</Form.Label>
              <Form.Control type="file" {...register('book_cover')} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="add.title">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Harry Potter" {...register('title', { required: true })} defaultValue={savedBook.title} />
              {errors.title && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="add.price">
              <Form.Label>Preço</Form.Label>
              <Form.Control type="number" placeholder="120.00" {...register('price', { required: true })} defaultValue={savedBook.price} />
              {errors.price && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="add.price">
              <Form.Label>Editora</Form.Label>
              <Form.Control type="text" placeholder="Editora do Harry Potter" {...register('publisherName', { required: true })} defaultValue={savedBook.publisher.name} />
              {errors.publisher && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="add.state">
              <Form.Label>Estado do livro</Form.Label>
              <Form.Control type="text" placeholder="Sem algumas folhas, mal estado" {...register('state_book', { required: true })} defaultValue={savedBook.state_book} />
              {errors.state_book && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="add.date">
              <Form.Label>Data da edição</Form.Label>
              <Form.Control type="date" {...register('date_edition', { required: true })} defaultValue={savedBook.date_edition} />
              {errors.date_edition && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="add.descrição">
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" rows={3} {...register('description', { required: true })} defaultValue={savedBook.description} />
              {errors.description && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-2">
              <Button type="submit" variant="primary">Cadastrar</Button>
            </Form.Group>
          </Form>
        )
      }
    </Container>
  );
};

export default EditBook;
