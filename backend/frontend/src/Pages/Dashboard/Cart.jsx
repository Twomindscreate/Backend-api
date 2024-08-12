import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const proudcts = useSelector((state) => state.cart);

  const removeToCart = (product) => {
    dispatch(remove(product.id));
  };

  const carts = proudcts?.map((product) => (
    <div className="col-md-3 mb-4" key={product.id}>
      <Card style={{ width: "18rem" }} className="h-100">
        <div className="d-flex align-items-center justify-content-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ background: "white" }}>
          <Button variant="danger" onClick={() => removeToCart(product)}>
            Remove
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <div className="row">
      {carts?.length ? (
        carts
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5">
          No carts added
        </div>
      )}
    </div>
  );
};

export default Cart;
