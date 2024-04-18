import Navbar from "./components/navbar/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./constantVariables";

const App = () => {
  const { user } = useAuth0();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isUserInDb, setIsUserInDb] = useState(null);

  const checkIfUserInDb = async () => {
    await axios
      .put(`${BACKEND_URL}/users`, {
        email: loggedInUser.name,
      })
      .then((response) => {
        if (response.data === null) {
          setIsUserInDb(false);
        } else {
          setIsUserInDb(true);
        }
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const setUser = () => {
    setLoggedInUser(user);
  };

  // Set loggedInUser when user object changes via Auth0
  useEffect(() => {
    setUser();
  }, [user]);

  useEffect(() => {
    if (loggedInUser) {
      checkIfUserInDb();
    }
  }, [loggedInUser]);

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
