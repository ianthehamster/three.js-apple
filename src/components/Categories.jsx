import React, { useState } from 'react';
import Navbar from './Navbar';
import CardCategory from './CardCategory';
import { Box, Card, Typography } from '@mui/material';
// import './index.css';
import '../index.css';

const Categories = () => {
  const [categories, setCategories] = useState([
    'Phones',
    'Laptops',
    'Accessories',
    'Tablets',
  ]);
  const [categoryTest, setCategoryTest] = useState('Phones');

  return (
    <main className="bg-black">
      <Navbar />
      {/* <section
        id="highlights"
        className="w-screen overflow-hidden h-full common-padding bg-zinc"
      > */}
      {/* <div className="mb-12 w-full md:flex items-end justify-between"> */}
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.875rem',
          lineHeight: '2.25rem',
          fontWeight: '500',
          // color: 'rgb(134, 134, 139, var(--tw-text-opacity))',
          color: 'rgb(134,134,139)',
        }}
      >
        Featured Products
      </h1>
      {/* </div> */}
      {/* <Typography
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.25rem',
          lineHeight: '2.25rem',
          fontWeight: '500',
          // color: 'rgb(134, 134, 139, var(--tw-text-opacity))',
          color: 'rgb(134,134,139)',
        }}
      >
        "Discover the Latest in Tech Essentials: Phones, Laptops, Accessories,
        and Tablets"
      </Typography> */}
      <div
        className="card-container"
        // style={{
        //   display: 'flex',
        //   // flexWrap: 'nowrap',
        //   // justifyContent: 'space-between',
        // }}
        style={{ display: 'flex' }}
      >
        {categories.map((category) => (
          <Box key={category} className="card">
            <Card
              className="card-category"
              style={{ width: '50%', margin: '0 auto' }}
            >
              <CardCategory category={category} />
            </Card>
            <Typography style={{ display: 'flex', justifyContent: 'center' }}>
              {category}
            </Typography>
          </Box>
        ))}
      </div>
      {/* </section> */}
    </main>
  );
};

export default Categories;
