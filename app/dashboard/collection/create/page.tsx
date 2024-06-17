"use client";
import Form2 from "@/components/Form2";
import { useRouteContext } from "@/context/routeContext";
import { useEffect } from "react";

function Page() {
  const { setActivePath } = useRouteContext();
  useEffect(() => {
    setActivePath("create");
  }, [setActivePath]);

  return <Form2 />;
}

export default Page;
