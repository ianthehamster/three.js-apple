import React from 'react';
import Navbar from '../navbar/Navbar';
import { Grid, Stack, Box } from '@mui/material';
import IncrementDecrementBtn from '../buttons/IncrementDecrementBtn';
import ModelFlagshipLaptop from '../ModelFlagshipProduct';
import AddToCartButton from '../buttons/AddToCartButton';

const SingleFlagshipProductPage = ({
  modelState,
  product,
  price,
  quantityInCart,
}) => {
  return (
    <div>
      <Navbar />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ModelFlagshipLaptop modelState={modelState} />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'block', margin: 'auto' }}>
            <Stack
              spacing={4}
              sx={{ p: 2, width: '100%' }}
              className="product-info-container"
            >
              <div className="product-title" style={{ margin: 'auto' }}>
                {product.title && product.title}
              </div>
              <div
                className="product-description"
                style={{ margin: '20px auto' }}
              >
                {product.description && product.description}
              </div>

              <div
                style={{
                  fontSize: '120%',
                  margin: '20px auto',
                }}
              >
                {product.price && price}
              </div>
              <div style={{ margin: '20px auto' }}>
                In stock: {product.stock_left && product.stock_left}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {quantityInCart === 0 ? (
                  <div style={{ margin: '20px auto' }}>
                    <AddToCartButton product={product} />
                  </div>
                ) : (
                  <div className="increment-btn">
                    <IncrementDecrementBtn product={product} />
                    <div>
                      <DeleteIcon
                        style={{ margin: 'auto 15px' }}
                        onClick={() => removeFromCart(product.id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleFlagshipProductPage;
