import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar';

const PaymentSuccessPage = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log(isAuthenticated, user);

  return (
    <div>
      <Navbar />
      PaymentSuccessPage
    </div>
  );
};

export default PaymentSuccessPage;
