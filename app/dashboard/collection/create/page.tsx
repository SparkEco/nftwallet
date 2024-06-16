"use client";
import Form2 from "@/components/Form2";
import { useRouteContext } from "@/context/routeContext";
import { useEffect } from "react";
const { setActivePath } = useRouteContext();

function Page() {
  useEffect(() => {
    setActivePath("home");
  }, []);
  return <Form2 />;
}

export default Page;
