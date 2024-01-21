import Card from "react-bootstrap/Card";

function BikeCard({ title, url, price, age }) {
  return (
    <Card id="card">
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Text>{age}</Card.Text>
        <Card.Text> € {price} / Month</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BikeCard;
