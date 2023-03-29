import { Stack, Button, Box } from "@chakra-ui/react";
import { DatePickerInput } from "chakra-datetime-picker";
import dayjs from "dayjs";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { InputField } from "../../../components/inputField";
import { Layout } from "../../../components/Layout";
import { useUpdateRideMutation } from "../../../generated/graphql";
import { CreateUrqlClient } from "../../../utils/createUrqlClient";
import { useGetRideFromUrl } from "../../../utils/useGetRideFromUrl";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [{ data, error, fetching }] = useGetRideFromUrl();
  const [, updateRide] = useUpdateRideMutation();
  const router = useRouter();

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
    <Layout variant="small" heading="Edit Ride" form top>
      <Formik
        enableReinitialize
        initialValues={{
          to: "",
          from: "",
          when: dayjs().toDate().toISOString(),
          seats: 0,
        }}
        onSubmit={async (values) => {
          const { error } = await updateRide({
            id: data.ride?.id!,
            input: {
              to: values.to,
              from: values.from,
              when: values.when,
              seats: parseFloat(values.seats.toString()),
            },
          });
          console.log(error);
          router.push(`/rides`);
          if (!error) {
            router.push("/rides");
          }
        }}
      >
        {({ isSubmitting, initialValues, setFieldValue }) => (
          <Form>
            <InputField
              name="from"
              placeholder="Kutus"
              label="Pick-up point"
              required={true}
            />
            <Box mt={4} />
            <InputField
              name="to"
              placeholder="Kerugoya"
              label="Destination"
              required={true}
            />
            <Box mt={4} />
            <DatePickerInput
              name="when"
              placeholder="DD-MM-YYYY 00:00:00"
              showTimeSelector
              showOkButton
              showSelectableDays
              okText="Done"
              onOk={(e) => {
                setFieldValue("when", e.toDate().toISOString());
                console.log(initialValues);
              }}
              size="lg"
              format="DD-MM-YYYY HH:mm:ss"
              currentLangKey="en"
            />
            <InputField
              name="seats"
              placeholder="5"
              label="no. of seats"
              required={true}
            />

            <Box mt={8} />
            <Stack>
              <Button
                isLoading={isSubmitting}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Edit Ride
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient)(Register);
