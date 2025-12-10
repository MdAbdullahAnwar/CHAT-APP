import {
  Button,
  Input,
  VStack,
  Toaster,
  createToaster,
  Stack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { User, Mail, Lock, Eye, EyeOff, Camera, Sparkles } from "lucide-react";

const toaster = createToaster({
  placement: "bottom",
  duration: 5000,
});
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toaster.create({
        title: "Please Fill all the Fields",
        type: "warning",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toaster.create({
        title: "Passwords Do Not Match",
        type: "warning",
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
      toaster.create({
        title: "Registration Successful",
        type: "success",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toaster.create({
        title: "Error Occured!",
        description: error.response.data.message,
        type: "error",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toaster.create({
        title: "Please Select an Image!",
        type: "warning",
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
      toaster.create({
        title: "Please Select an Image!",
        type: "warning",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <>
      <Toaster toaster={toaster} />
      <VStack gap={4} w="100%">
        <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
        <GridItem>
        <Field.Root required>
          <Field.Label
            fontSize="lg"
            fontWeight="bold"
            color="purple.700"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <User size={20} /> Name
          </Field.Label>
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
        </Field.Root>
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
        <Field.Root required>
          <Field.Label
            fontSize="lg"
            fontWeight="bold"
            color="pink.700"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Lock size={20} /> Password
          </Field.Label>
          <Stack direction="row" gap={2} w="100%">
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
        </GridItem>
        <GridItem>
        <Field.Root required>
          <Field.Label
            fontSize="lg"
            fontWeight="bold"
            color="orange.700"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Lock size={20} /> Confirm Password
          </Field.Label>
          <Stack direction="row" gap={2} w="100%">
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
        </GridItem>
        </Grid>
        <Field.Root>
          <Field.Label
            fontSize="lg"
            fontWeight="bold"
            color="teal.700"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Camera size={20} /> Upload your Picture
          </Field.Label>
          <Input
            type="file"
            p={4}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            size="lg"
            borderRadius="xl"
            borderWidth="3px"
            borderStyle="dashed"
            borderColor="teal.300"
            _hover={{ borderColor: "teal.500" }}
            bg="white"
            h="auto"
          />
        </Field.Root>
        <Button
          bg="pink.500"
          color="white"
          width="100%"
          size="xl"
          mt={4}
          onClick={submitHandler}
          loading={picLoading}
          borderRadius="xl"
          fontWeight="bold"
          fontSize="lg"
          _hover={{ bg: "pink.600", transform: "scale(1.02)", shadow: "xl" }}
          transition="all 0.2s"
          display="flex"
          gap={2}
        >
          <Sparkles size={20} /> Create Account
        </Button>
      </VStack>
    </>
  );
};

export default Signup;
