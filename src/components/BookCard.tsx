import Link from 'next/link';
import { Button } from 'react-bootstrap';

function BookCard({ book, handleDelete }) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.price}</td>
      <td>{book.publisher.name}</td>
      <td>{book.state_book}</td>
      <td>{book.date_edition}</td>
      <td>
        <Link href={`/editBook/${book.id}`}>
          <Button type="button" variant="secondary">Editar</Button>
        </Link>

        <Button
          type="button"
          variant="danger"
          onClick={() => handleDelete(book.id)}
          className="ms-2"
        >
          Excluir

        </Button>
      </td>
    </tr>
  );
}

export default BookCard;
