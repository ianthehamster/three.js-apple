import Navbar from './components/navbar/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from './constantVariables';

const App = () => {
  const { user } = useAuth0();
  const [isUserInDb, setIsUserInDb] = useState(null);

  const checkIfUserInDb = async () => {
    if (user && user.name) {
      await axios
        .put(`${BACKEND_URL}/users`, {
          email: user.name,
        })
        .then((response) => {
          if (response.data === null) {
            setIsUserInDb(false); // why not just set the default state as false?
          } else {
            setIsUserInDb(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const postNewUser = async () => {
    if (isUserInDb === false && user.email) {
      await axios // no need to await something if it is the last thing to run within a function
        .post(`${BACKEND_URL}/users`, {
          first_name: user.first_name ? user.first_name : null,
          last_name: user.last_name ? user.last_name : null,
          email: user.email,
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (user) {
      checkIfUserInDb();
    }
  }, [user]);

  useEffect(() => {
    if (user && !isUserInDb) {
      postNewUser();
    }
  }, [user, isUserInDb]);

  return (
    <main>
      <Navbar isUserInDb={isUserInDb} />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
};

export default App;
