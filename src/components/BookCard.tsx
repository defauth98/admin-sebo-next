function BookCard({book}) {
  return (
    <li>
      <span>{book.title}</span>
      <br />
      <p>{book.description}</p>
      <br />
      <strong>{book.price}</strong>
      <br />
      <span>{book.publisher}</span>
      <span>{book.state_book}</span>
      <span>{book.date_edition}</span>
      <span>{book.id}</span>
    </li>
  )
}

export default BookCard;