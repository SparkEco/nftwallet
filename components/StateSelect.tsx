import React, { Dispatch, SetStateAction } from "react";
import { FormState } from "./Form3";
import { Label } from "./ui/label";
import {
  SelectContent,
  SelectTrigger,
  Select,
  SelectValue,
  SelectItem,
} from "./ui/select";
import CoutriesJSON from "@/utils/countries.json";

interface StateSelectProps {
  country: string;
  setState: Dispatch<SetStateAction<FormState>>;
}

const StateSelect = React.memo(({ country, setState }: StateSelectProps) => {
  const data: any = Array.from(JSON.parse(JSON.stringify(CoutriesJSON))).find(
    (item: any) => item.name === country
  );

  const onValueChange = (value: string) => {
    setState((p) => ({
      ...p,
      state: value,
    }));
  };
  return (
    <fieldset className={`w-full space-y-2`}>
      <Label className={`flex items-center space-x-1`}>
        <span className={`text-[17px]`}>7</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="#000000"
          viewBox="0 0 16 16"
          className="shouldFlipIfRtl"
        >
          <path d="M8.47 1.97a.75.75 0 0 1 1.06 0l4.897 4.896a1.25 1.25 0 0 1 0 1.768L9.53 13.53a.75.75 0 0 1-1.06-1.06l3.97-3.97H1.75a.75.75 0 1 1 0-1.5h10.69L8.47 3.03a.75.75 0 0 1 0-1.06"></path>
        </svg>
        <span className={`text-[17px]`}>Select your state</span>
      </Label>
      <Select
        name="location_state"
        disabled={!country}
        onValueChange={onValueChange}
      >
        <SelectTrigger className={`w-full h-[50px]`}>
          <SelectValue placeholder={`Select your state`} />
        </SelectTrigger>
        <SelectContent>
          {Array.from(data.states).map((item: any, index) => (
            <SelectItem value={item.name} key={index}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </fieldset>
  );
});
export default StateSelect;
