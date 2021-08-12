import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container } from 'react-bootstrap';
import { authContext } from '../context/authContext';

export default function Home() {
  const router = useRouter();
  const { login } = useContext(authContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data) {
    const { email, password } = data;

    if (email && password) {
      login(email, password);

      router.push('/admin');
    }
  }

  return (
    <Container className="w-25 p-3 border">
      <h1> Faça seu login</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register('password', { required: true })} />
          {errors.password && <span>This field is required</span>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
