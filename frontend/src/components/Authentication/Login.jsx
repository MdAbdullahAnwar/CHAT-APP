import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack, HStack, Box } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { Mail, Lock, Eye, EyeOff, LogIn, UserCircle } from "lucide-react";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <VStack spacing="20px">
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
          value={email}
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
      <FormControl id="password" isRequired>
        <FormLabel
          fontSize="lg"
          fontWeight="bold"
          color="purple.700"
          display="flex"
          alignItems="center"
        >
          <Box as={Lock} size={20} mr={2} />
          Password
        </FormLabel>
        <HStack spacing={2}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            size="lg"
            borderRadius="xl"
            borderWidth="2px"
            borderColor="purple.300"
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 3px rgba(128, 90, 213, 0.2)",
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
            borderColor="purple.400"
            color="purple.700"
            _hover={{ bg: "purple.50" }}
            flexShrink={0}
          >
            <Box as={show ? EyeOff : Eye} size={18} mr={1} />
            {show ? "Hide" : "Show"}
          </Button>
        </HStack>
      </FormControl>
      <HStack spacing={3} w="100%" mt={2}>
        <Button
          bg="blue.500"
          color="white"
          flex={1}
          size="lg"
          onClick={submitHandler}
          isLoading={loading}
          borderRadius="xl"
          fontWeight="bold"
          fontSize="lg"
          _hover={{ bg: "blue.600", transform: "scale(1.02)", shadow: "xl" }}
          transition="all 0.2s"
        >
          <Box as={LogIn} size={20} mr={2} />
          Login Now
        </Button>
        <Button
          variant="outline"
          flex={1}
          size="lg"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          borderRadius="xl"
          borderWidth="2px"
          borderColor="pink.500"
          color="pink.500"
          fontWeight="bold"
          _hover={{ bg: "teal.50" }}
        >
          <Box as={UserCircle} size={20} mr={2} />
          Guest
        </Button>
      </HStack>
    </VStack>
  );
};

export default Login;
