import React, { useState } from "react";
import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import UserMenu from "../Menu/UserMenu";
import useAuthContext from "../../hooks/useAuthContext";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isUser = localStorage.getItem("isLoggedIn");

  return (
    <header>
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex justifyContent="center" textAlign="center">
            {isUser && <UserMenu />}
            {!isUser && (
              <Link to="/auth">
                <BiLogIn />
              </Link>
            )}
          </Flex>
          <Text
            py={4}
            fontSize="1.4rem"
            fontWeight="bold"
            letterSpacing={-0.5}
            textAlign="center"
          >
            <Link to="/home">Shopping List</Link>
          </Text>
          <Flex justifyContent="center" textAlign="center">
            {colorMode === "light" ? (
              <BsMoonStars onClick={toggleColorMode} cursor="pointer" />
            ) : (
              <BsSun
                onClick={toggleColorMode}
                cursor="pointer"
                width="24px"
                height="24px"
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default Nav;
