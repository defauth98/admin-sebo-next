import { Card } from 'react-bootstrap';

function BookCard({ book }) {
  return (
    <li className="">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>
            <h3>{book.title}</h3>
          </Card.Title>
          <Card.Text>
            <p>{book.date_edition}</p>
          </Card.Text>

          <Card.Text>
            <p>{book.description}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
}

export default BookCard;
