"use client";
import { MoonLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <MoonLoader size={100} color="#3D00B7" />
    </div>
  );
}

export default Loading;
