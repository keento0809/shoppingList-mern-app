import React, { useEffect } from "react";
import FormModal from "../components/modal/FormModal";
import { Box, useMediaQuery } from "@chakra-ui/react";
import Work from "../components/work/Work";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const { setCurrentUser } = useAuthContext();

  useEffect(() => {
    const currentToken = sessionStorage.getItem("isLoggedIn");
    if (currentToken) {
      const config = {
        headers: {
          authToken: currentToken,
        },
      };
      axios
        .get("/user", config)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  return (
    <>
      <Box
        display={isLargerThan1024 ? "flex" : ""}
        justifyContent={isLargerThan1280 ? "flex-start" : "space-between"}
      >
        <FormModal />
        <Work />
      </Box>
    </>
  );
};

export default Home;
