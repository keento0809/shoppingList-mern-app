import React from "react";
import ShoppingList from "../components/List/ShoppingList";
import Layout from "../Layout/Layout";
import FormModal from "../components/Modal/FormModal";
import { Box, useMediaQuery } from "@chakra-ui/react";

const Home = () => {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  return (
    <Layout>
      <Box display={isLargerThan1024 ? "flex" : ""}>
        <FormModal />
        <ShoppingList />
      </Box>
    </Layout>
  );
};

export default Home;
