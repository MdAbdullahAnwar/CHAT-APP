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
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Settings, Edit3, UserPlus, Search } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

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
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
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
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
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
    setGroupChatName("");
  };

  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
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
              <Settings size={28} />
              {selectedChat.chatName}
            </ModalHeader>
          </Box>
          <ModalCloseButton color="white" top={6} right={6} _hover={{ bg: "whiteAlpha.300" }} />
          <ModalBody d="flex" flexDir="column" alignItems="center" p={6} bg="gray.50">
            <Box w="100%" mb={4}>
              <Text fontSize="sm" fontWeight="600" color="gray.600" mb={2}>
                Group Members ({selectedChat.users.length})
              </Text>
              <Box d="flex" flexWrap="wrap" gap={2}>
                {selectedChat.users.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    admin={selectedChat.groupAdmin}
                    handleFunction={() => handleRemove(u)}
                  />
                ))}
              </Box>
            </Box>
            <FormControl d="flex" mb={4} gap={2}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="teal.500">
                  <Edit3 size={18} />
                </Box>
                <Input
                  placeholder="Rename Group"
                  pl={10}
                  size="lg"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="teal.300"
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  _hover={{ borderColor: "teal.400" }}
                  bg="white"
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </Box>
              <Button
                bgGradient="linear(to-r, teal.400, teal.600)"
                color="white"
                size="lg"
                borderRadius="xl"
                fontWeight="bold"
                isLoading={renameloading}
                onClick={handleRename}
                _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)" }}
                px={8}
              >
                Update
              </Button>
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
            <Box w="100%" maxH="200px" overflowY="auto" borderRadius="xl">
              {loading ? (
                <Box textAlign="center" py={8}>
                  <Spinner size="lg" color="teal.500" />
                </Box>
              ) : searchResult?.length > 0 ? (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
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
              onClick={() => handleRemove(user)}
              bg="red.500"
              color="white"
              size="lg"
              w="full"
              borderRadius="xl"
              fontWeight="bold"
              _hover={{ bg: "red.600", transform: "scale(1.02)" }}
              _active={{ transform: "scale(0.98)" }}
              transition="all 0.2s"
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
