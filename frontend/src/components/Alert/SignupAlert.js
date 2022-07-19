import React from "react";
import useAlertContext from "../../hooks/useAlertContext";
import { Alert, AlertIcon, useMediaQuery } from "@chakra-ui/react";

const SignupAlert = () => {
  const { signupAlert } = useAlertContext();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {signupAlert && (
        <Alert
          maxWidth={isLargerThan768 ? "400px" : ""}
          status="success"
          variant="left-accent"
          position="fixed"
          bottom={9}
          left={4}
          width="90%"
          zIndex={10}
        >
          <AlertIcon />
          Successfully Signed up!
        </Alert>
      )}
    </>
  );
};

export default SignupAlert;
