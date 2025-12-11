
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogTrigger,
} from "@chakra-ui/react";
import { Button, Text, Image, Box } from "@chakra-ui/react";
import { useState } from "react";

const ProfileModal = ({ user, children, open: controlledOpen, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  return (
    <DialogRoot
      size="lg"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      centered
    >
      {!isControlled && (
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
      )}

      <DialogContent height="410px">
        <DialogHeader
          fontSize="40px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
        >
          {user.name}
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
          />
          <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">
            Email: {user.email}
          </Text>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ProfileModal;
