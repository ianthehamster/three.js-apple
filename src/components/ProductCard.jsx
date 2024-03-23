import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../utils/formatCurrency";
import DeleteIcon from "@mui/icons-material/Delete";
import AddToCartButton from "./buttons/AddToCartButton";

const ProductCard = ({ product }) => {
  console.log(product);
  const price = formatCurrency(product.price);
  const quantityInCart = 1; // for testing purposes the quantity in cart is hard coded
  return (
    <div>
      <Card sx={{ width: 380, height: 400 }}>
        <CardContent>
          <CardMedia
            component="img"
            sx={{ height: 250, objectFit: "cover" }}
            image={product.img}
            alt="product"
          />
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <Button size="small">Share</Button>
          </div>
          <div>
            <Button size="small">Learn More</Button>
          </div>
          <AddToCartButton quantityInCart={quantityInCart} />
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
