import { Container, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import LoginAlert from "../components/Alert/LoginAlert";
import LogoutAlert from "../components/Alert/LogoutAlert";
import SignupAlert from "../components/Alert/SignupAlert";
import SuccessAlert from "../components/Alert/SuccessAlert";
import WarnAlert from "../components/Alert/WarnAlert";
import Nav from "../components/nav/Nav";

const Layout = ({ children }) => {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  return (
    <>
      <Nav />
      <Container
        maxWidth={
          !isLargerThan1024
            ? "468px"
            : isLargerThan1024 && !isLargerThan1280
            ? "1024px"
            : "1280px"
        }
        pt="66px"
        px={isLargerThan1024 ? "56px" : "16px"}
      >
        {children}
      </Container>
      <SuccessAlert />
      <WarnAlert />
      <LoginAlert />
      <LogoutAlert />
      <SignupAlert />
    </>
  );
};

export default Layout;
