import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlertContext from "../../hooks/useAlertContext";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext";
import { guestUser } from "../../data/data";

const LoginForm = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState();

  const { setLoginAlert } = useAlertContext();
  const { setIsLoggedIn, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const fetchPostRequest = (obj) => {
    axios
      .post("/auth/login", obj)
      .then((res) => {
        navigate("/home");
        setFormInput({
          email: "",
          password: "",
        });
        setLoginAlert(true);
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        localStorage.setItem("isLoggedIn", res.data.token);
        setTimeout(() => {
          setLoginAlert(false);
        }, 2000);
        res.json({ msg: "ok, it works" });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (formInput.email === "" || formInput.password === "") return;

    const regexEmail = /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/;
    const regex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;

    // validation
    if (
      !formInput.email.match(regexEmail) === ""
      // !formInput.password.match(regex)
    ) {
      alert("Invalid Credential.");
      return;
    }

    const enteredInfo = {
      email: formInput.email,
      password: formInput.password,
    };

    fetchPostRequest(enteredInfo);
  };

  const handleGuestLogin = () => {
    const guestUserInfo = guestUser;
    console.log(guestUserInfo);
    if (!guestUserInfo) {
      setError("Failed to guest login.");
    }

    fetchPostRequest(guestUserInfo);
  };

  return (
    <Box pt={6}>
      <Box minHeight={4}>
        {error && (
          <Text py={2} textAlign="center" fontSize="md" color="tomato">
            {error}
          </Text>
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isSubmit && formInput.email === ""}>
          <FormLabel htmlFor="email" pt={4}>
            Email
          </FormLabel>
          <Input
            name="email"
            px={4}
            py={1}
            focusBorderColor="pink.100"
            value={formInput.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Enter email"
          />
          {isSubmit && <FormErrorMessage>Email is required.</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={isSubmit && formInput.password === ""}>
          <FormLabel htmlFor="password" pt={4}>
            Password
          </FormLabel>
          <Input
            name="password"
            px={4}
            py={1}
            focusBorderColor="pink.100"
            value={formInput.password}
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Enter password"
          />
          {isSubmit && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          mt={16}
          w="full"
          type="submit"
          backgroundColor="pink.100"
          variant="solid"
        >
          Login
        </Button>
      </form>
      {/* test */}
      <Text
        textAlign="center"
        mt={8}
        cursor="pointer"
        onClick={handleGuestLogin}
      >
        Login as guest user
      </Text>
    </Box>
  );
};

export default LoginForm;
