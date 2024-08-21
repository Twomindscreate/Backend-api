import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/Slice/product/cartSlice";
import { getProducts } from "../../store/Slice/product/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const {
    data: products,
    isLoading,
    isError,
  } = useSelector((state) => state.products);
  console.log(products);
  //   const [products, getProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (isLoading) {
    return (
      <div className="center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (isError) {
    return <p>Something went wrong.</p>;
  }

  const addToCart = (product) => {
    // dispatch add action
    dispatch(add(product));
  };

  const cards = products.map((product) => (
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
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add To Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">My Products</h1>
      <div className="row">{cards}</div>
    </div>
  );
};

export default Product;
