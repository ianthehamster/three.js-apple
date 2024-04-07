import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./constantVariables";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [isUserInDb, setIsUserInDb] = useState(null);

  const getAllUsers = async () => {
    await axios.get(`${BACKEND_URL}/users`).then((response) => {
      setAllUsers(response.data);
    });
  };

  const checkIfUserInDb = async () => {
    console.log(`loggedInUser.name is ${loggedInUser.name}`);
    await axios
      .put(`${BACKEND_URL}/users`, {
        name: loggedInUser.name,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === null) {
          setIsUserInDb(false);
        } else {
          setIsUserInDb(true);
        }

        // postNewUser();
      });
  };

  // const postNewUser = async () => {
  //   if (isUserInDb === false) {
  //     console.log(`postNewUser is called`);
  //     await axios
  //       .post(`${BACKEND_URL}/users`, {
  //         first_name: loggedInUser.first_name,
  //         last_name: loggedInUser.last_name,
  //         email: loggedInUser.name,
  //       })
  //       .then((response) => console.log(response))
  //       .catch((err) => console.error(err));
  //   }
  // };

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

  console.log(isUserInDb);
  console.log(loggedInUser);

  return (
    <main>
      {/* <main className="bg-black"> */}
      <Navbar isUserInDb={isUserInDb} />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
};

export default App;
