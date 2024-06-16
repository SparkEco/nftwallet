"use client";
import { useRouteContext } from "@/context/routeContext";
function Page() {
  const { setActivePath } = useRouteContext();
  setActivePath("home");
  return <div></div>;
}

export default Page;
