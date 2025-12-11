import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack, HStack, Box, Grid } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { User, Mail, Lock, Eye, EyeOff, Camera, Sparkles } from "lucide-react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      window.location.href = "/chats";
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="15px">
      <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
        <Box>
          <FormControl id="first-name" isRequired>
            <FormLabel
              fontSize="lg"
              fontWeight="bold"
              color="purple.700"
              display="flex"
              alignItems="center"
            >
              <Box as={User} size={20} mr={2} />
              Name
            </FormLabel>
            <Input
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              size="lg"
              borderRadius="xl"
              borderWidth="2px"
              borderColor="purple.300"
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 3px rgba(128, 90, 213, 0.2)",
              }}
              bg="white"
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="email" isRequired>
            <FormLabel
              fontSize="lg"
              fontWeight="bold"
              color="blue.700"
              display="flex"
              alignItems="center"
            >
              <Box as={Mail} size={20} mr={2} />
              Email Address
            </FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              borderRadius="xl"
              borderWidth="2px"
              borderColor="blue.300"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.2)",
              }}
              bg="white"
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl id="password" isRequired>
            <FormLabel
              fontSize="lg"
              fontWeight="bold"
              color="pink.700"
              display="flex"
              alignItems="center"
            >
              <Box as={Lock} size={20} mr={2} />
              Password
            </FormLabel>
            <HStack spacing={2}>
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
                borderRadius="xl"
                borderWidth="2px"
                borderColor="pink.300"
                _focus={{
                  borderColor: "pink.500",
                  boxShadow: "0 0 0 3px rgba(237, 100, 166, 0.2)",
                }}
                bg="white"
                flex={1}
              />
              <Button
                size="lg"
                onClick={handleClick}
                variant="outline"
                w="100px"
                borderRadius="xl"
                borderWidth="2px"
                borderColor="pink.400"
                color="pink.700"
                _hover={{ bg: "pink.50" }}
                flexShrink={0}
              >
                <Box as={show ? EyeOff : Eye} size={18} mr={1} />
                {show ? "Hide" : "Show"}
              </Button>
            </HStack>
          </FormControl>
        </Box>
        <Box>
          <FormControl id="confirm-password" isRequired>
            <FormLabel
              fontSize="lg"
              fontWeight="bold"
              color="orange.700"
              display="flex"
              alignItems="center"
            >
              <Box as={Lock} size={20} mr={2} />
              Confirm Password
            </FormLabel>
            <HStack spacing={2}>
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                size="lg"
                borderRadius="xl"
                borderWidth="2px"
                borderColor="orange.300"
                _focus={{
                  borderColor: "orange.500",
                  boxShadow: "0 0 0 3px rgba(246, 173, 85, 0.2)",
                }}
                bg="white"
                flex={1}
              />
              <Button
                size="lg"
                onClick={handleClick}
                variant="outline"
                w="100px"
                borderRadius="xl"
                borderWidth="2px"
                borderColor="orange.400"
                color="orange.700"
                _hover={{ bg: "orange.50" }}
                flexShrink={0}
              >
                <Box as={show ? EyeOff : Eye} size={18} mr={1} />
                {show ? "Hide" : "Show"}
              </Button>
            </HStack>
          </FormControl>
        </Box>
      </Grid>
      <FormControl id="pic">
        <FormLabel
          fontSize="lg"
          fontWeight="bold"
          color="teal.700"
          display="flex"
          alignItems="center"
        >
          <Box as={Camera} size={20} mr={2} />
          Upload your Picture
        </FormLabel>
        <Input
          type="file"
          p={2}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          size="lg"
          borderRadius="xl"
          borderWidth="3px"
          borderStyle="dashed"
          borderColor="teal.300"
          _hover={{ borderColor: "teal.500" }}
          bg="white"
        />
      </FormControl>
      <Button
        bg="pink.500"
        color="white"
        width="100%"
        size="lg"
        mt={4}
        onClick={submitHandler}
        isLoading={picLoading}
        borderRadius="xl"
        fontWeight="bold"
        fontSize="lg"
        _hover={{ bg: "pink.600", transform: "scale(1.02)", shadow: "xl" }}
        transition="all 0.2s"
      >
        <Box as={Sparkles} size={20} mr={2} />
        Create Account
      </Button>
    </VStack>
  );
};

export default Signup;
