function BookCard({ book }) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.price}</td>
      <td>{book.publisher.name}</td>
      <td>{book.state_book}</td>
      <td>{book.date_edition}</td>
      <td>
        <button type="button">editar</button>
        <button type="button">excluir</button>
      </td>
    </tr>
  );
}

export default BookCard;
