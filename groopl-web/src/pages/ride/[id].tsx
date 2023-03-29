import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { ChatButton } from "../../components/ChatButton";
import { EditDeleteRideButtons } from "../../components/EditDeleteRideButtons";
import { Layout } from "../../components/Layout";
import NavBar from "../../components/NavBar/navBar";
import { CreateUrqlClient } from "../../utils/createUrqlClient";
import { useGetRideFromUrl } from "../../utils/useGetRideFromUrl";

const Ride: NextPage = ({}) => {
  const [{ data, error, fetching }] = useGetRideFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.ride) {
    return (
      <Layout>
        <Box>could not find ride</Box>
      </Layout>
    );
  }

  return (
    <>
      <NavBar />
      <Box
        margin={"auto"}
        w="full"
        h="full"
        alignItems="center"
        justifyContent="center"
        textAlign={"center"}
        px={10}
        py={5}
      >
        <Heading>
          Ride from {data.ride.from} to {data.ride.to}
        </Heading>
        <Box textAlign={"left"}>
          <Box mb={4}>Number of Seats {data.ride.seats}</Box>
          <Box mb={4}>Driver: {data.ride.creator.username}</Box>
          <Box mb={4}>Driver Contact: {data.ride.creator.contact}</Box>
          <Box bottom={0}>
            <ChatButton id={data.ride.id} creatorId={data.ride.creator.id} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Ride);
