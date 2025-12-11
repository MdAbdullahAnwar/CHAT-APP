import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { User } from "lucide-react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.600" />
        <ModalContent borderRadius="2xl" boxShadow="0 20px 60px rgba(0, 0, 0, 0.3)" overflow="hidden">
          <Box bgGradient="linear(to-r, teal.400, teal.600)" p={6}>
            <ModalHeader
              fontSize="2xl"
              fontFamily="Work sans"
              fontWeight="bold"
              color="white"
              d="flex"
              alignItems="center"
              gap={3}
              p={0}
            >
              <User size={28} />
              {user.name}
            </ModalHeader>
          </Box>
          <ModalCloseButton color="white" top={6} right={6} _hover={{ bg: "whiteAlpha.300" }} />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap={6}
            py={8}
            bg="gray.50"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              border="4px solid"
              borderColor="teal.400"
              boxShadow="0 8px 20px rgba(20, 184, 166, 0.2)"
            />
            <Text
              fontSize="lg"
              fontFamily="Work sans"
              color="gray.700"
              fontWeight="500"
            >
              <strong>Email:</strong> {user.email}
            </Text>
          </ModalBody>
          <ModalFooter bg="white" borderTop="1px solid" borderColor="gray.200" p={4}>
            <Button
              onClick={onClose}
              bgGradient="linear(to-r, teal.400, teal.600)"
              color="white"
              size="lg"
              w="full"
              borderRadius="xl"
              fontWeight="bold"
              _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)", transform: "scale(1.02)" }}
              _active={{ transform: "scale(0.98)" }}
              transition="all 0.2s"
              boxShadow="0 4px 15px rgba(20, 184, 166, 0.3)"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
