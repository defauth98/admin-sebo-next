import Link from 'next/link';

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
          <button type="button">Editar</button>
        </Link>

        <button type="button" onClick={() => handleDelete(book.id)}>Excluir</button>
      </td>
    </tr>
  );
}

export default BookCard;
