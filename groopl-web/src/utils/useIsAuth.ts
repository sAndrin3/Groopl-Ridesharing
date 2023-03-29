import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  // useEffect(() => {
  //   if (!fetching) {
  //     if (data?.me) {
  //     } else {
  //       router.replace(`/splash?next=${router.pathname}`);
  //     }
  //   }
  // }, [data, router, fetching]);

  if (!fetching) {
    return data;
  }
};
