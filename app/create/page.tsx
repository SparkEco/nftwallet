"use client";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Form3 from "@/components/Form3";
import Form2 from "@/components/Form2";

export interface AllImageData {
  image: string;
}

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

function Page() {
  return <Form3 />;
}

export default Page;
