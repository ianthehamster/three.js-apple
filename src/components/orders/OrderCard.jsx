import React from "react";
import { Typography, Card, CardContent, Divider } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Orders.css";

const OrderCard = (props) => {
  const orderPrice = formatCurrency(props.order.total_price);
  const formattedDate = new Date(props.order.createdAt).toLocaleString();
  const address = props.order.address.address;

  const products = props.order.products;

  const orderedProducts = products.map((product) => (
    <div key={product.id} className="order-products">
      <div className="product-info">
        <div className="product-name">{product.title}</div>
        <div className="product-in-order-img">
          <img src={product.img && product.img} alt="product_img" />
        </div>
        <div className="quantity">x{product.order_products.quantity}</div>
        <div className="price">
          {product.price && formatCurrency(product.price)}
        </div>
      </div>
    </div>
  ));
  const orderCard = (
    <div className="order-card">
      <Card>
        <CardContent>
          <div className="order-info">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Order id: {props.order.id}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Created: {formattedDate}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Shipped to: {address && address}
            </Typography>
          </div>
          <Divider />
          {orderedProducts}
          <div className="total-price">
            <Typography gutterBottom variant="h6" component="div">
              Total: {orderPrice}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return <div>{props.order && orderCard}</div>;
};

export default OrderCard;
