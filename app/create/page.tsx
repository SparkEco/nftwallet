"use client";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Form2 from "@/components/Form2";
import Form3 from "@/components/Form3";

export interface AllImageData {
  image: string;
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <fieldset className={`w-full`}>
      <Label className={`font-semibold`}>
        {label}
        {children}
      </Label>
    </fieldset>
  );
};

function Page() {
  return <Form3 />;
}

export default Page;
