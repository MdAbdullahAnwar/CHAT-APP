import {
  Dialog,
  Portal,
  CloseButton,
  Button,
  Input,
  Box,
  Field,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { toast } from "react-toastify";

const GroupChatModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warning("User already added", {
        autoClose: 5000,
        position: "top-center",
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
      toast.error("Failed to Load the Search Results", {
        autoClose: 5000,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warning("Please fill all the fields", {
        autoClose: 5000,
        position: "top-center",
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
      toast.success("New Group Chat Created!", {
        autoClose: 5000,
        position: "bottom-center",
      });
    } catch (error) {
      toast.error(error.response?.data || "Failed to Create the Chat!", {
        autoClose: 5000,
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        centered
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header
                fontSize="35px"
                fontFamily="Work sans"
                display="flex"
                justifyContent="center"
              >
                <Dialog.Title>Create Group Chat</Dialog.Title>
              </Dialog.Header>
              <Dialog.CloseTrigger
                asChild
                position="absolute"
                top="2"
                right="2"
              >
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
              <Dialog.Body
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Field.Root>
                  <Input
                    placeholder="Chat Name"
                    mb={3}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Input
                    placeholder="Add Users eg: John, Piyush, Jane"
                    mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Field.Root>
                <Box w="100%" display="flex" flexWrap="wrap">
                  {selectedUsers.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </Box>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  searchResult
                    ?.slice(0, 4)
                    .map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    ))
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Button onClick={handleSubmit} colorPalette="blue">
                  Create Chat
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default GroupChatModal;
