"use client";
import Form3 from "@/components/Form3";
import { useRouteContext } from "@/context/routeContext";

function Page() {
  const { setActivePath } = useRouteContext();
  setActivePath("testimonial");
  return <Form3 />;
}

export default Page;
