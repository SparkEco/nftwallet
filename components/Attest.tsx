"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import NextImage from "next/image";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

interface MintProps {
  children: React.ReactNode;
}

interface FormState {
  coverimage: File | null;
  description: string;
}

function Attest({ children }: MintProps) {
  const [inputValues, setInputValues] = useState<FormState>({
    coverimage: null,
    description: "",
  });
  const [coverImage, setCoverImage] = useState("/");
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const files = event.target.files; // Access the selected files from event

    if (files != null && files.length > 0) {
      const file = files[0]; // Get the first selected file
      const reader = new FileReader();
      setInputValues({
        ...inputValues,
        [inputName]: file, // Handle null if no file is selected
      });
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setCoverImage(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };
  const style = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    section: {
      margin: 10,
      padding: 10,
      flexFlow: 1,
    },
    image: {
      width: "88vw",
      height: "90vh",
    },
  });
  const Template = () => (
    <Document>
      <Page size={"A4"} style={style.page}>
        <View style={style.section}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={coverImage} style={style.image} />
        </View>
      </Page>
      <Page size={"A4"} style={style.page}>
        <View style={style.section}>
          <Text>{inputValues.description}</Text>
        </View>
      </Page>
    </Document>
  );

  function isFormFilled(inputValues: FormState): boolean {
    return inputValues.description !== "" && inputValues.coverimage !== null;
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[21]" />
        <AlertDialog.Content className="fixed focus:outline-none drop-shadow-md border z-[22] border-neutral-700 top-7 right-0 rounded-tl-[20px] rounded-bl-[20px] bg-white p-[25px]">
          <AlertDialog.Title
            className={`text-center flex items-center justify-center font-semibold text-[24px]`}
          >
            <NextImage
              src={`/attest.png`}
              alt="link"
              width={26}
              height={26}
              className={`rounded-[50%]`}
            />
            <p>DeReSy</p>
          </AlertDialog.Title>
          <AlertDialog.Description
            className={`text-center text-[13px] text-[#727272]`}
          >
            DEcentralized REview SYstem powered by Momus.eth
          </AlertDialog.Description>
          <form className={`w-[40vw] h-[65vh] space-y-7`}>
            <fieldset className={`w-full block`}>
              <label htmlFor="cover" className={`ps-6 block my-2 text-[17px]`}>
                Cover Image
              </label>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, "coverimage")}
                name="coverimage"
                id="image"
                className={`rounded-[15px] block text-[14px] mx-auto mt-2 h-[30px] py-[2px] w-[93%] border ps-3`}
              />
            </fieldset>
            <textarea
              name="description"
              placeholder="Describe your NFT"
              value={inputValues.description}
              onChange={handleInputChange}
              className={`p-4 block mx-auto w-[93%] h-[140px] rounded-[15px] border`}
            />
            {/* <button
              className={`rounded-[20px] flex w-[130px] mx-auto text-white bg-[#3D00B7] hover:opacity-75 active:opacity-60 h-[35px] border justify-center items-center`}
              type="submit"
            >
              Submit
            </button> */}

            <PDFDownloadLink
              document={<Template />}
              fileName="testament.pdf"
              className={`rounded-[20px] disabled:bg-slate-400 flex w-[130px] disabled:hover:opacity-100 mx-auto text-white bg-[#3D00B7] hover:opacity-75 active:opacity-60 h-[35px] border justify-center items-center`}
            >
              Attest
            </PDFDownloadLink>
          </form>
          <AlertDialog.Cancel asChild>
            <button
              className={`fixed top-3 right-3 flex items-center border shadow justify-center w-[30px] h-[30px] rounded-[50%] bg-white`}
            >
              <IoClose size={23} color={"#000000"} />
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Attest;
