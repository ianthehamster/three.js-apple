import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const price = formatCurrency(product.price);

  const navigate = useNavigate();
  const handleLearnClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div>
      <Card
        sx={{
          width: 370,
          height: 400,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) ",
        }}
      >
        <CardContent>
          <CardMedia
            component="img"
            sx={{ height: 250, objectFit: "contain" }} //
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
            <Button size="small" onClick={handleLearnClick}>
              Learn More
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
