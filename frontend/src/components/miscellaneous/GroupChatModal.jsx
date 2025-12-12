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
  FormControl,
  Input,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import { Users, Search, Sparkles } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
        <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.600" />
        <ModalContent
          borderRadius="2xl"
          boxShadow="0 20px 60px rgba(0, 0, 0, 0.3)"
          overflow="hidden"
        >
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
              <Users size={28} />
              Create Group Chat
            </ModalHeader>
          </Box>
          <ModalCloseButton color="white" top={6} right={6} _hover={{ bg: "whiteAlpha.300" }} />
          <ModalBody d="flex" flexDir="column" alignItems="center" p={6} bg="gray.50">
            <FormControl mb={4}>
              <Box position="relative">
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="teal.500">
                  <Sparkles size={20} />
                </Box>
                <Input
                  placeholder="Group Name"
                  pl={10}
                  size="lg"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="teal.300"
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  _hover={{ borderColor: "teal.400" }}
                  bg="white"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </Box>
            </FormControl>
            <FormControl mb={3}>
              <Box position="relative">
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="teal.500">
                  <Search size={20} />
                </Box>
                <Input
                  placeholder="Search users to add..."
                  pl={10}
                  size="lg"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="teal.300"
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  _hover={{ borderColor: "teal.400" }}
                  bg="white"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Box>
            </FormControl>
            {selectedUsers.length > 0 && (
              <Box w="100%" mb={3}>
                <Text fontSize="sm" fontWeight="600" color="gray.600" mb={2}>
                  Selected Members ({selectedUsers.length})
                </Text>
                <Box d="flex" flexWrap="wrap" gap={2}>
                  {selectedUsers.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </Box>
              </Box>
            )}
            <Box w="100%" maxH="250px" overflowY="auto" borderRadius="xl">
              {loading ? (
                <Box textAlign="center" py={8}>
                  <Text color="gray.500" fontWeight="500">Searching...</Text>
                </Box>
              ) : searchResult?.length > 0 ? (
                searchResult
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              ) : search && (
                <Box textAlign="center" py={8}>
                  <Text color="gray.400">No users found</Text>
                </Box>
              )}
            </Box>
          </ModalBody>
          <ModalFooter bg="white" borderTop="1px solid" borderColor="gray.200" p={4}>
            <Button
              onClick={handleSubmit}
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
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
