"use client";
import Form2 from "@/components/Form2";
import { useRouteContext } from "@/context/routeContext";
const { setActivePath } = useRouteContext();

function Page() {
  setActivePath("create");
  return <Form2 />;
}

export default Page;
