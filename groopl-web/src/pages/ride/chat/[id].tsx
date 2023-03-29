import {
  Flex,
  VStack,
  Box,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import ChatBubble from "../../../components/ChatBubble";
import { InputField } from "../../../components/inputField";
import { Layout } from "../../../components/Layout";
import NavBar from "../../../components/NavBar/navBar";
import {
  useMessagesQuery,
  useSendMessageMutation,
} from "../../../generated/graphql";
import { CreateUrqlClient } from "../../../utils/createUrqlClient";
import { useGetRideFromUrl } from "../../../utils/useGetRideFromUrl";

const Chat = () => {
  const [{ data, error, fetching }] = useGetRideFromUrl();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data: dataM, fetching: fetchingM }] = useMessagesQuery({
    variables,
  });

  const [, sendMessage] = useSendMessageMutation();

  if (!fetchingM && !dataM) {
    return <div>you got query failed for some reason</div>;
  }

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
        zIndex={1}
        position="sticky"
        top={"60px"}
        px="20px"
        py="20px"
        w="full"
        h="10%"
      >
        <Stat>
          <StatLabel color="gray.500">Chat with Driver</StatLabel>
          <StatNumber>{data.ride.creator.username}</StatNumber>
        </Stat>
      </Box>
      <VStack
        w="full"
        h="100vh"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        px={10}
        py={5}
      >
        <Box overflowY="auto" p="3px 7px" w="full" h="70%">
          {dataM?.messages?.messages.map(({ text, sender_id }, index) => (
            <ChatBubble key={index} message={text} from={sender_id} />
          )).reverse()}
        </Box>
      </VStack>
      <Flex
        zIndex={1}
        position="sticky"
        bottom={0}
        w="full"
        h="10%"
        marginBottom={0}
        alignItems="center"
        justifyContent="center" /* style={{ border: "1px solid black" }} */
        backdropFilter={"revert-layer"}
        paddingBottom={4}
      >
        <Formik
          enableReinitialize
          initialValues={{
            text: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
            const { error, data: Message } = await sendMessage({
              is_read: false,
              receiver_id: data.ride?.creator.id!,
              text: values.text,
            });
            console.log(error);
            console.log("message", Message);
          }}
        >
          <Form>
            <InputField
              name="text"
              placeholder="Type your message"
              width="100%"
              p="10px"
            />
            <IconButton
              colorScheme="blue"
              aria-label="send message"
              variant="ghost"
              icon={<IoSend />}
              type="submit"
            />
          </Form>
        </Formik>
      </Flex>
    </>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Chat);
