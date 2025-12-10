import {
  Button,
  Input,
  VStack,
  Toaster,
  createToaster,
  Stack,
} from "@chakra-ui/react";
import { Mail, Lock, Eye, EyeOff, LogIn, UserCircle } from "lucide-react";
import { Field } from "@chakra-ui/react";

const toaster = createToaster({
  placement: "bottom",
  duration: 5000,
});
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  // const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toaster.create({
        title: "Please Fill all the Fields",
        type: "warning",
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

      toaster.create({
        title: "Login Successful",
        type: "success",
      });
      // setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toaster.create({
        title: "Error Occured!",
        description: error.response.data.message,
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster toaster={toaster} />
      <VStack gap={4} w="100%">
        <Field.Root required>
          <Field.Label
            fontSize="lg"
            fontWeight="bold"
            color="blue.700"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Mail size={20} /> Email Address
          </Field.Label>
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
        </Field.Root>
        <Field.Root required>
          <Field.Label
            fontSize="lg"
            fontWeight="bold"
            color="purple.700"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Lock size={20} /> Password
          </Field.Label>
          <Stack direction="row" gap={2} w="100%">
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
              {show ? (
                <>
                  <EyeOff size={18} /> Hide
                </>
              ) : (
                <>
                  <Eye size={18} /> Show
                </>
              )}
            </Button>
          </Stack>
        </Field.Root>
        <Stack direction="row" gap={3} w="100%" mt={2}>
          <Button
            bg="blue.500"
            color="white"
            flex={1}
            size="xl"
            onClick={submitHandler}
            loading={loading}
            borderRadius="xl"
            fontWeight="bold"
            fontSize="lg"
            _hover={{ bg: "blue.600", transform: "scale(1.02)", shadow: "xl" }}
            transition="all 0.2s"
            display="flex"
            gap={2}
          >
            <LogIn size={20} /> Login Now
          </Button>
          <Button
            variant="outline"
            flex={1}
            size="xl"
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123456");
            }}
            borderRadius="xl"
            borderWidth="2px"
            borderColor="teal.400"
            color="teal.700"
            fontWeight="bold"
            _hover={{ bg: "teal.50" }}
            display="flex"
            gap={2}
          >
            <UserCircle size={20} /> Guest
          </Button>
        </Stack>
      </VStack>
    </>
  );
};

export default Login;
