import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface ChatButtonProps{
  id: number;
  creatorId: number;
}

export const ChatButton: React.FC<ChatButtonProps> = ({
  id,
  creatorId,
}) => {
  const [{ data, fetching }] = useMeQuery();

  if (data?.me?.id == creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/ride/chat/[id]" as={`/ride/chat/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          icon={<ChatIcon />}
          aria-label="Chat"
        />
      </NextLink>
    </Box>
  );
};
