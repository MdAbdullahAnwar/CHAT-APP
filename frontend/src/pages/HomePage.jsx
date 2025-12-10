import { Box, Container, Tabs, Text } from "@chakra-ui/react";
import { MessageCircle, LogIn, UserPlus } from "lucide-react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="4xl" centerContent py={10}>
      <Box
        bgGradient="to-r"
        gradientFrom="pink.400"
        gradientVia="purple.500"
        gradientTo="blue.500"
        w="100%"
        py={5}
        px={8}
        borderRadius="2xl"
        boxShadow="xl"
        mb={6}
        textAlign="center"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: "to-br",
          gradientFrom: "whiteAlpha.200",
          gradientTo: "transparent",
          pointerEvents: "none",
        }}
      >
        <Text
          fontSize="5xl"
          fontWeight="extrabold"
          color="white"
          textShadow="2px 2px 8px rgba(0,0,0,0.3)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={3}
          position="relative"
          letterSpacing="tight"
        >
          <MessageCircle size={48} strokeWidth={2.5} /> Talk-A-Tive
        </Text>
        <Text fontSize="md" color="white" mt={1.5} fontWeight="medium" textShadow="1px 1px 3px rgba(0,0,0,0.2)" position="relative">
          Connect, Chat, Celebrate Together!
        </Text>
      </Box>
      <Box
        bgGradient="to-br"
        gradientFrom="pink.50"
        gradientVia="purple.50"
        gradientTo="blue.50"
        w="100%"
        p={10}
        borderRadius="3xl"
        boxShadow="2xl"
        border="3px solid"
        borderColor="purple.200"
      >
        <Tabs.Root defaultValue="login" fitted variant="plain">
          <Tabs.List
            bgGradient="to-r"
            gradientFrom="purple.100"
            gradientTo="blue.100"
            borderRadius="2xl"
            p={2}
            mb={8}
            border="2px solid"
            borderColor="purple.300"
          >
            <Tabs.Trigger
              value="login"
              borderRadius="xl"
              fontSize="xl"
              fontWeight="bold"
              display="flex"
              gap={2}
              position="relative"
              _selected={{
                bg: "blue.500",
                color: "white",
                shadow: "lg",
              }}
              _after={{
                content: '""',
                display: "none",
              }}
            >
              <LogIn size={22} /> Login
            </Tabs.Trigger>
            <Tabs.Trigger
              value="signup"
              borderRadius="xl"
              fontSize="xl"
              fontWeight="bold"
              display="flex"
              gap={2}
              position="relative"
              _selected={{
                bg: "pink.500",
                color: "white",
                shadow: "lg",
              }}
              _after={{
                content: '""',
                display: "none",
              }}
            >
              <UserPlus size={22} /> Sign Up
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="login">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <Signup />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
}

export default Homepage;
