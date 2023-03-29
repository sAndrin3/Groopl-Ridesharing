import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDeleteRideMutation, useMeQuery } from "../generated/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface EditDeleteRideButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeleteRideButtons: React.FC<EditDeleteRideButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data, fetching }] = useMeQuery();
  const [, deleteRide] = useDeleteRideMutation();

  if (data?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/ride/edit/[id]" as={`/ride/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit Ride"
        />
      </NextLink>
      <NextLink href="/rides">
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete Post"
          onClick={() => {
            deleteRide({
              id: id,
            });
          }}
        />
      </NextLink>
    </Box>
  );
};
