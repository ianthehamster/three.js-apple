import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar';

const PaymentSuccessPage = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log(isAuthenticated, user);

  /**
   * Hi [customer name],

Thanks for your order!

[Order number]
[Order Date]
[Estimated time of delivery]

[Table of items purchased]

[Delivery details]

Thanks,
The [brand name] team
   */

  return (
    <div>
      <Navbar />
      PaymentSuccessPage
    </div>
  );
};

export default PaymentSuccessPage;
