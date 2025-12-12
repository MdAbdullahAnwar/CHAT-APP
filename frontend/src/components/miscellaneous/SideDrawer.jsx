import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Search, MessageCircle, Bell, User, LogOut } from "lucide-react";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
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

      const { data } = await axios.get(`/api/user?search=${search}`, config);

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

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bgGradient="linear(to-r, teal.400, teal.600)"
        w="100%"
        p="12px 20px"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            onClick={onOpen}
            bg="white"
            color="teal.600"
            _hover={{ bg: "teal.50", transform: "scale(1.05)" }}
            transition="all 0.2s"
            borderRadius="xl"
            fontWeight="bold"
            boxShadow="sm"
            leftIcon={<Box as={Search} size={18} />}
          >
            <Text d={{ base: "none", md: "flex" }}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Box d="flex" alignItems="center" gap={2}>
          <Box as={MessageCircle} size={28} color="white" />
          <Text fontSize="2xl" fontFamily="Work sans" fontWeight="bold" color="white" letterSpacing="tight">
            Talk-A-Tive
          </Text>
        </Box>
        <Box d="flex" alignItems="center" gap={3}>
          <Menu>
            <MenuButton
              as={Button}
              bg="whiteAlpha.300"
              color="white"
              _hover={{ bg: "whiteAlpha.400" }}
              _active={{ bg: "whiteAlpha.500" }}
              borderRadius="xl"
              p={2}
              position="relative"
            >
              <Box as={Bell} size={22} />
              {notification.length > 0 && (
                <Box
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  bg="red.500"
                  borderRadius="full"
                  w="20px"
                  h="20px"
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  fontWeight="bold"
                  color="white"
                >
                  {notification.length}
                </Box>
              )}
            </MenuButton>
            <MenuList bg="white" borderRadius="xl" boxShadow="xl" p={2}>
              {!notification.length && <Box p={3} color="gray.500">No New Messages</Box>}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                  borderRadius="lg"
                  _hover={{ bg: "teal.50" }}
                  mb={1}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="whiteAlpha.300"
              color="white"
              _hover={{ bg: "whiteAlpha.400" }}
              _active={{ bg: "whiteAlpha.500" }}
              borderRadius="xl"
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                name={user.name}
                src={user.pic}
                border="2px solid white"
              />
            </MenuButton>
            <MenuList bg="white" borderRadius="xl" boxShadow="xl" p={2}>
              <ProfileModal user={user}>
                <MenuItem borderRadius="lg" _hover={{ bg: "teal.50" }} icon={<Box as={User} size={18} />}>
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler} borderRadius="lg" _hover={{ bg: "red.50" }} color="red.600" icon={<Box as={LogOut} size={18} />}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter="blur(4px)" bg="blackAlpha.600" />
        <DrawerContent borderRadius="0 2xl 2xl 0" overflow="hidden">
          <DrawerHeader
            bgGradient="linear(to-r, teal.400, teal.600)"
            color="white"
            fontSize="xl"
            fontWeight="bold"
            d="flex"
            alignItems="center"
            gap={2}
            borderBottom="none"
          >
            <Box as={Search} size={24} />
            Search Users
          </DrawerHeader>
          <DrawerBody bg="gray.50" p={4}>
            <Box d="flex" pb={4} gap={2}>
              <Box position="relative" flex={1}>
                <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="teal.500">
                  <Box as={Search} size={18} />
                </Box>
                <Input
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="lg"
                  pl={10}
                  borderRadius="xl"
                  border="2px solid"
                  borderColor="teal.300"
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  _hover={{ borderColor: "teal.400" }}
                  bg="white"
                />
              </Box>
              <Button
                onClick={handleSearch}
                bgGradient="linear(to-r, teal.400, teal.600)"
                color="white"
                size="lg"
                borderRadius="xl"
                fontWeight="bold"
                px={8}
                _hover={{ bgGradient: "linear(to-r, teal.500, teal.700)", transform: "scale(1.05)" }}
                transition="all 0.2s"
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <Box textAlign="center" py={8}>
                <Spinner size="xl" color="teal.500" thickness="4px" />
              </Box>
            ) : searchResult?.length > 0 ? (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : search && (
              <Box textAlign="center" py={8}>
                <Text color="gray.400" fontSize="lg">No users found</Text>
              </Box>
            )}
            {loadingChat && (
              <Box d="flex" justifyContent="center" mt={4}>
                <Spinner color="teal.500" size="lg" />
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
