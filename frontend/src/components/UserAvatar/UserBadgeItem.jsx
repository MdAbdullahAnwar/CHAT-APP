import { X } from "lucide-react";
import { Badge, Box } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorPalette="purple"
      cursor="pointer"
      onClick={handleFunction}
      display="flex"
      alignItems="center"
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <Box as="span" pl={1} display="inline-flex" alignItems="center">
        <X size={12} />
      </Box>
    </Badge>
  );
};

export default UserBadgeItem;
