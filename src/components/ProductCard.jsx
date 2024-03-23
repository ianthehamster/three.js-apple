import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../utils/formatCurrency";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductCard = ({ product }) => {
  console.log(product);
  const price = formatCurrency(product.price);
  const quantityInCart = 0; // for testing purposes the quantity in cart is hard coded
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
          {/* <Typography variant="body2" color="text.secondary">
            {product.shipping_details}
          </Typography> */}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <Button size="small">Share</Button>
          </div>
          <div>
            <Button size="small">Learn More</Button>
          </div>
          {quantityInCart === 0 ? (
            <Button size="small">Add to cart</Button>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                size="small"
                style={{ padding: "4px", minWidth: "24px" }}
              >
                +
              </Button>

              <span style={{ margin: "0 10px" }}>{quantityInCart} in cart</span>

              <Button
                variant="outlined"
                size="small"
                style={{ padding: "4px", minWidth: "24px" }}
              >
                -
              </Button>
              <DeleteIcon style={{ margin: "auto 15px" }} />
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
