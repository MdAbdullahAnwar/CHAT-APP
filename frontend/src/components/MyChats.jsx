import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      p={0}
      bg="#E8E8E8"
      w={{ base: "100%", md: "31%" }}
      borderRadius="2xl"
      boxShadow="0 8px 30px rgba(0, 0, 0, 0.12)"
      overflow="hidden"
    >
      <Box
        p={4}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        bgGradient="linear(to-r, teal.400, teal.600)"
        boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
      >
        <Text
          fontSize="xl"
          fontFamily="Work sans"
          fontWeight="bold"
          color="white"
        >
          My Chats
        </Text>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "12px", md: "10px", lg: "12px" }}
            rightIcon={<AddIcon />}
            bg="white"
            color="teal.600"
            size="sm"
            borderRadius="lg"
            fontWeight="bold"
            _hover={{ bg: "teal.50", transform: "scale(1.05)" }}
            transition="all 0.2s"
            boxShadow="sm"
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box d="flex" flexDir="column" p={3} w="100%" h="100%" overflowY="hidden">
        {chats ? (
          <Stack overflowY="auto" spacing={2} pb={0} h="100%">
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat);
                  setNotification(
                    notification.filter((n) => n.chat._id !== chat._id)
                  );
                }}
                cursor="pointer"
                bg={selectedChat === chat ? "teal.500" : "teal.50"}
                color={selectedChat === chat ? "white" : "gray.800"}
                px={4}
                py={3}
                borderRadius="xl"
                key={chat._id}
                _hover={{
                  bg: selectedChat === chat ? "teal.600" : "teal.100",
                  transform: "scale(1.02)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
                boxShadow={
                  selectedChat === chat
                    ? "0 4px 15px rgba(20, 184, 166, 0.3)"
                    : "sm"
                }
              >
                <Text fontWeight="700" fontSize="md">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text
                    fontSize="xs"
                    opacity={selectedChat === chat ? 0.9 : 0.7}
                    mt={1}
                    noOfLines={1}
                  >
                    <b>{chat.latestMessage.sender.name}: </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
