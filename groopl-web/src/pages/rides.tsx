import {
  Flex,
  Heading,
  Stack,
  Button,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { EditDeleteRideButtons } from "../components/EditDeleteRideButtons";
import { Layout } from "../components/Layout";
import {
  useAcceptRideMutation,
  useMeQuery,
  useRidesQuery,
} from "../generated/graphql";
import { CreateUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const Offers = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useRidesQuery({
    variables,
  });

  const [{ data: dataM, fetching: fetchingM }] = useMeQuery();

  const [, acceptRide] = useAcceptRideMutation();

  const router = useRouter();

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout variant="regular" heading="Ride Offers" top>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.rides.rides.map((r) => (
            <Box
              key={r.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius={"10px"}
              bg={useColorModeValue("gray.200", "gray.700")}
            >
              <Heading fontSize="xl">
                From: {r.from}
                <br />
                <br />
                To: {r.to}
              </Heading>
              <Box py={4} />
              <Text mt={4}>
                Ride will commence on {dayjs(r.when).toString()}
              </Text>
              <Box py={2} />
              <Box display={"flex"} flexDir={"row"} my={5}>
                <Text>{r.seats} seats</Text>
                <Box mx={{ base: "75px", md: "120px" }}></Box>
                <Box alignContent={"end"}>
                  {r.remainingSeats > 0 ? (
                    <>
                      {r.passengers.includes(dataM?.me?.id!) && !fetchingM ? (
                        <>
                          <Box color={"blue.500"}>Accepted Ride</Box>
                        </>
                      ) : (
                        <>
                          {dataM?.me?.id! == r.creator.id ? (
                            <>
                              <Box color={"yellow.300"}>
                                Remaining Seats {r.remainingSeats}
                                <EditDeleteRideButtons
                                  id={r.id}
                                  creatorId={r.creator.id}
                                />
                              </Box>
                            </>
                          ) : (
                            <>
                              {" "}
                              <Button
                                onClick={() => {
                                  acceptRide({
                                    id: r.id,
                                  });
                                  router.push(`/ride/${r.id}`);
                                }}
                                bgColor={"blue.800"}
                                color={"white"}
                              >
                                Accept Ride
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Box color={"red.300"}>Ride Capacity Full</Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.rides.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.rides.rides[data.rides.rides.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more rides
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Offers);
