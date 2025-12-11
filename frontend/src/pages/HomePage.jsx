import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
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
    <Container maxW="4xl" centerContent py={8}>
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center"
        p={5}
        bgGradient="linear(to-r, teal.400, teal.600)"
        w="100%"
        mb={4}
        borderRadius="2xl"
        boxShadow="0 10px 40px rgba(0, 0, 0, 0.2)"
      >
        <Text
          fontSize="5xl"
          fontFamily="Work sans"
          fontWeight="bold"
          color="white"
          letterSpacing="tight"
        >
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={6}
        pb={6}
        borderRadius="2xl"
        boxShadow="0 10px 40px rgba(0, 0, 0, 0.15)"
        backdropFilter="blur(10px)"
        mb={8}
      >
        <Tabs isFitted variant="soft-rounded" colorScheme="teal">
          <TabList mb="2em" bg="gray.50" borderRadius="xl" p={2}>
            <Tab
              _selected={{ color: "white", bg: "teal.500" }}
              fontWeight="semibold"
              fontSize="lg"
              borderRadius="lg"
              transition="all 0.2s"
            >
              Login
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "teal.500" }}
              fontWeight="semibold"
              fontSize="lg"
              borderRadius="lg"
              transition="all 0.2s"
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0} pb={0}>
              <Login />
            </TabPanel>
            <TabPanel px={0} pb={0}>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
