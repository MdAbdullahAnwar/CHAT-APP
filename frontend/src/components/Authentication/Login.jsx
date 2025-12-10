import { Button, Input, VStack, Stack } from "@chakra-ui/react";
import { Mail, Lock, Eye, EyeOff, LogIn, UserCircle } from "lucide-react";
import { Field } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  // const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warning("Please Fill all the Fields", { position: "top-right" });
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

      toast.success("Login Successful", { position: "top-right" });
      // setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Occured!", { position: "top-right" });
      setLoading(false);
    }
  };

  return (
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
  );
};

export default Login;
