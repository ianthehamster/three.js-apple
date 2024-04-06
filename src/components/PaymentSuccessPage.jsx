import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar';
import { BACKEND_URL } from '../constantVariables';

const PaymentSuccessPage = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log(isAuthenticated, user);

  // const getUserId = async function(){
  //   try{
  //     const user = await axios.get()
  //   }catch(err){
  //     console.error(err)
  //   }
  // }

  // useEffect(async () => {
  //   try{
  //     const postOrder = await axios.post()
  //   }catch(err){

  //   }

  //   return () => {
  //     second;
  //   };
  // }, []);

  const getUserId = async () => {
    await axios
      .put(`${BACKEND_URL}/users`, {
        name: user.name,
      })
      .then((response) => console.log(response));
  };

  useEffect(() => {
    getUserId();
  }, [user]);

  return (
    <div>
      <Navbar />
      PaymentSuccessPage
    </div>
  );
};

export default PaymentSuccessPage;
