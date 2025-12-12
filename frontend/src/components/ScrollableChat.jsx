import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { format } from "date-fns";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {m.media ? (
                <div style={{ marginBottom: "5px" }}>
                  {m.media.type === "image" ? (
                    <img
                      src={m.media.url}
                      alt="shared media"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => window.open(m.media.url, "_blank")}
                    />
                  ) : (
                    <video
                      src={m.media.url}
                      controls
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                  {m.content && <div style={{ marginTop: "5px" }}>{m.content}</div>}
                </div>
              ) : (
                <span>{m.content}</span>
              )}
              <span
                style={{
                  fontSize: "10px",
                  color: "#667781",
                  marginTop: "2px",
                  alignSelf: "flex-end",
                }}
              >
                {format(new Date(m.createdAt), "HH:mm")}
              </span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
