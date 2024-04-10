import React from "react";
import {
  Grid,
  Stack,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Orders.css";

const OrderCard = (props) => {
  const orderPrice = formatCurrency(props.order.total_price);

  const formattedDate = new Date(props.order.createdAt).toLocaleString();
  const address = props.order.address.address;

  const products = props.order.products;

  const orderedProducts = products.map((product) => (
    <div key={product.id} className="order-products">
      <Stack spacing={2}>
        <div className="product-info">
          <div>{product.title}</div>
          <div className="product-in-order-img">
            <img src={product.img && product.img} alt="product_img" />
          </div>
          <div>{`x${product.order_products.quantity}`}</div>
        </div>
      </Stack>
    </div>
  ));
  const orderCard = (
    <div className="order-card">
      <Card>
        <CardContent>
          <div className="order-info">
            <Typography gutterBottom variant="h6" component="div">
              Order id: {props.order.id}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Created: {formattedDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total: {orderPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Shipped to: {address && address}
            </Typography>
          </div>
          <Divider />
          {orderedProducts}
        </CardContent>

        <CardActions className="order-card-actions">
          <div className="order-card-btn">
            <Button size="small">View details</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );

  return <div>{props.order && orderCard}</div>;
};

export default OrderCard;
