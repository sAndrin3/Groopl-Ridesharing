import { Flex, VStack, HStack, Text, Box } from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";

interface ChatBubbleProps {
  message: String;
  from: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, from }) => {
  const [{ data, fetching }] = useMeQuery();
  const isMe = from === data?.me?.id;
  console.log("id", data?.me?.id);
  const bottomLeftRadius = isMe ? null : 0;
  const bottomRightRadius = isMe ? 0 : null;

  return (
    <VStack spacing={1} alignItems={isMe ? "flex-end" : "flex-start"}>
      <Box
        bg={isMe ? "blue.500" : "red.300"}
        px={4}
        py={2}
        maxW={80}
        rounded="10px"
        my={2}
        borderBottomLeftRadius={bottomLeftRadius}
        borderBottomRightRadius={bottomRightRadius}
        overflow="hidden"
        fontSize="xs"
        color={'black'}
      >
        {message}
      </Box>
    </VStack>
  );
};

export default ChatBubble;
