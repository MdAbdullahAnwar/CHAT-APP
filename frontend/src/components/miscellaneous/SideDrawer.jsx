import { Box, Button, Input, Text, Spinner } from "@chakra-ui/react";
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseTrigger,
} from "@chakra-ui/react";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ChatLoading from "../ChatLoading";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const history = useHistory();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-menu]')) {
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warning("Please enter something to search", {
        position: "top-left",
        autoClose: 5000,
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
      toast.error("Failed to load search results", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats?.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      setIsOpen(false);
    } catch (error) {
      toast.error("Error fetching the chat", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderBottomWidth="5px"
        borderColor="gray.200"
      >
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <Search size={20} />
          <Text display={{ base: "none", md: "flex" }} px={4}>
            Search User
          </Text>
        </Button>

        <Text fontSize="2xl" fontFamily="Work sans" fontWeight="bold">
          Talk-A-Tive
        </Text>

        <Box display="flex" alignItems="center" gap={4}>
          <Box position="relative" data-menu>
            <Box
              display="flex"
              alignItems="center"
              position="relative"
              cursor="pointer"
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
            >
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
                style={{ position: 'absolute', top: '-5px', right: '-5px' }}
              />
              <Bell size={36} />
            </Box>
            {notifOpen && (
              <Box
                position="fixed"
                top="60px"
                right="20px"
                bg="white"
                border="1px solid #e2e8f0"
                borderRadius="md"
                boxShadow="lg"
                zIndex={1000}
                minW="250px"
              >
                {!notification.length ? (
                  <Box p={3}>No New Messages</Box>
                ) : (
                  notification.map((notif) => (
                    <Box
                      key={notif._id}
                      p={3}
                      borderBottom="1px solid #e2e8f0"
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter((n) => n !== notif));
                        setNotifOpen(false);
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(user, notif.chat.users)}`}
                    </Box>
                  ))
                )}
              </Box>
            )}
          </Box>

          <Box position="relative" data-menu>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              cursor="pointer"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
            >
              <img
                src={user?.pic}
                alt={user?.name}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <ChevronDown size={16} />
            </Box>
            {profileOpen && (
              <Box
                position="fixed"
                top="60px"
                right="20px"
                bg="white"
                border="1px solid #e2e8f0"
                borderRadius="md"
                boxShadow="lg"
                zIndex={1000}
                minW="150px"
              >
                <Box
                  p={3}
                  borderBottom="1px solid #e2e8f0"
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  w="100%"
                  onClick={() => {
                    setProfileModalOpen(true);
                    setProfileOpen(false);
                  }}
                >
                  My Profile
                </Box>
                <Box
                  p={3}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  w="100%"
                  onClick={() => {
                    logoutHandler();
                    setProfileOpen(false);
                  }}
                >
                  Logout
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <ProfileModal user={user} open={profileModalOpen} onOpenChange={setProfileModalOpen} />

      <DrawerRoot placement="start" open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerCloseTrigger />
          <DrawerBody>
            <Box display="flex" pb={2} gap={2}>
              <Input
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch} colorScheme="blue">
                Go
              </Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}

            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}

export default SideDrawer;
