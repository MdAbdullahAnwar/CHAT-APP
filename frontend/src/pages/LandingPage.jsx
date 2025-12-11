import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { MessageCircle, Users, Shield, Zap, Globe, Lock } from "lucide-react";

const LandingPage = () => {
  const history = useHistory();

  return (
    <Box minH="100vh" bgGradient="linear(to-br, teal.50, cyan.50, blue.50)">
      {/* Header */}
      <Box
        bgGradient="linear(to-r, teal.400, teal.600)"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Container maxW="7xl" py={4}>
          <HStack justifyContent="space-between">
            <HStack spacing={3}>
              <Box as={MessageCircle} size={32} color="white" />
              <Text
                fontSize="3xl"
                fontFamily="Work sans"
                fontWeight="bold"
                color="white"
              >
                Talk-A-Tive
              </Text>
            </HStack>
            <HStack spacing={4}>
              <Button
                onClick={() => history.push("/auth")}
                bg="white"
                color="teal.600"
                size="lg"
                borderRadius="xl"
                fontWeight="bold"
                _hover={{ bg: "teal.50", transform: "scale(1.05)" }}
                transition="all 0.2s"
                px={8}
              >
                Get Started
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxW="7xl" py={20}>
        <VStack spacing={8} textAlign="center">
          <Box
            bg="teal.100"
            color="teal.700"
            px={6}
            py={2}
            borderRadius="full"
            fontWeight="600"
            fontSize="sm"
          >
            Connect • Chat • Collaborate
          </Box>
          <Text
            fontSize={{ base: "4xl", md: "6xl" }}
            fontFamily="Work sans"
            fontWeight="bold"
            bgGradient="linear(to-r, teal.600, cyan.600, blue.600)"
            bgClip="text"
            lineHeight="1.2"
          >
            Real-Time Messaging
            <br />
            Made Simple
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" maxW="2xl">
            Connect with friends, family, and colleagues instantly. Experience
            seamless communication with our modern, secure chat platform.
          </Text>
          <HStack spacing={4} pt={4}>
            <Button
              onClick={() => history.push("/auth")}
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              size="lg"
              borderRadius="xl"
              fontWeight="bold"
              px={10}
              py={7}
              fontSize="lg"
              _hover={{
                bgGradient: "linear(to-r, teal.500, teal.700)",
                transform: "scale(1.05)",
              }}
              transition="all 0.2s"
              boxShadow="0 8px 25px rgba(20, 184, 166, 0.3)"
            >
              Start Chatting Now
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Features Section */}
      <Container maxW="7xl" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Text
              fontSize="4xl"
              fontFamily="Work sans"
              fontWeight="bold"
              color="gray.800"
            >
              Why Choose Talk-A-Tive?
            </Text>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Everything you need for seamless communication in one place
            </Text>
          </VStack>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={8}
            w="100%"
          >
            <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(20, 184, 166, 0.2)",
              }}
            >
              <Box as={Zap} size={48} color="teal.500" mb={4} />
              <Text fontSize="2xl" fontWeight="bold" mb={3} color="gray.800">
                Lightning Fast
              </Text>
              <Text color="gray.600">
                Real-time messaging with instant delivery. No delays, no
                waiting.
              </Text>
            </Box>

            <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(20, 184, 166, 0.2)",
              }}
            >
              <Box as={Shield} size={48} color="teal.500" mb={4} />
              <Text fontSize="2xl" fontWeight="bold" mb={3} color="gray.800">
                Secure & Private
              </Text>
              <Text color="gray.600">
                Your conversations are protected with industry-standard
                encryption.
              </Text>
            </Box>

            <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(20, 184, 166, 0.2)",
              }}
            >
              <Box as={Users} size={48} color="teal.500" mb={4} />
              <Text fontSize="2xl" fontWeight="bold" mb={3} color="gray.800">
                Group Chats
              </Text>
              <Text color="gray.600">
                Create groups and chat with multiple people at once
                effortlessly.
              </Text>
            </Box>

            <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(20, 184, 166, 0.2)",
              }}
            >
              <Box as={Globe} size={48} color="teal.500" mb={4} />
              <Text fontSize="2xl" fontWeight="bold" mb={3} color="gray.800">
                Access Anywhere
              </Text>
              <Text color="gray.600">
                Chat from any device, anywhere in the world. Always connected.
              </Text>
            </Box>

            <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(20, 184, 166, 0.2)",
              }}
            >
              <Box as={MessageCircle} size={48} color="teal.500" mb={4} />
              <Text fontSize="2xl" fontWeight="bold" mb={3} color="gray.800">
                User Friendly
              </Text>
              <Text color="gray.600">
                Clean, intuitive interface that anyone can use without training.
              </Text>
            </Box>

            <Box
              bg="white"
              p={8}
              borderRadius="2xl"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.1)"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(20, 184, 166, 0.2)",
              }}
            >
              <Box as={Lock} size={48} color="teal.500" mb={4} />
              <Text fontSize="2xl" fontWeight="bold" mb={3} color="gray.800">
                Privacy First
              </Text>
              <Text color="gray.600">
                We never share your data. Your privacy is our top priority.
              </Text>
            </Box>
          </Grid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bgGradient="linear(to-r, teal.400, teal.600)" py={20}>
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontFamily="Work sans"
              fontWeight="bold"
              color="white"
            >
              Ready to Start Chatting?
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              maxW="2xl"
            >
              Join thousands of users already enjoying seamless communication
            </Text>
            <Button
              onClick={() => history.push("/auth")}
              bg="white"
              color="teal.600"
              size="lg"
              borderRadius="xl"
              fontWeight="bold"
              px={12}
              py={7}
              fontSize="lg"
              _hover={{ bg: "teal.50", transform: "scale(1.05)" }}
              transition="all 0.2s"
              boxShadow="0 8px 25px rgba(0, 0, 0, 0.2)"
            >
              Get Started Free
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.900" py={8}>
        <Container maxW="7xl">
          <HStack justifyContent="space-between" color="gray.400">
            <Text>© 2025 Talk-A-Tive. All rights reserved.</Text>
            <HStack spacing={3}>
              <Box as={MessageCircle} size={24} color="teal.400" />
              <Text color="white" fontWeight="600">
                Talk-A-Tive
              </Text>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
