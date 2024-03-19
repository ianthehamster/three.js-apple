import React from 'react';
import { Button, CardActions, CardContent, Typography } from '@mui/material';

const CardCategory = ({ category }) => {
  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Click here</Button>
      </CardActions>
    </React.Fragment>
  );
};

export default CardCategory;
