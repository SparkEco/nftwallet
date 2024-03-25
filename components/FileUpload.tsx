"use client";

import { useField } from "formik";

export function SingleFile(props: any) {
  const [field, meta, helpers] = useField(props.name);
  const { value, ...rest } = field;
  // console.log(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      helpers.setValue(file);
    }
  };

  return (
    <div>
      <input
        {...rest}
        {...props}
        onChange={(event) => handleChange(event)}
        className={`rounded-[15px] outline-none file:rounded-[15px] file:text-[#3D00B7] file:border-0 file:bg-violet-50 hover:file:bg-violet-100 text-[14px] block mx-auto mt-2 h-[35px] py-[2px] w-[93%] border ps-3`}
      />
    </div>
  );
}

export function MultiFile(props: any) {
  const [field, meta, helpers] = useField(props.name);
  const { value, ...rest } = field;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      helpers.setValue(files);
    }
  };

  return (
    <div>
      <input
        {...rest}
        {...props}
        onChange={(event) => handleChange(event)}
        className={`rounded-[15px] outline-none file:rounded-[15px] file:text-[#3D00B7] file:border-0 file:bg-violet-50 hover:file:bg-violet-100 text-[14px] block mx-auto mt-2 h-[35px] py-[2px] w-[93%] border ps-3`}
      />
    </div>
  );
}
