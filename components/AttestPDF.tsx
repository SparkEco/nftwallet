"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import NextImage from "next/image";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
  usePDF,
} from "@react-pdf/renderer";

import toast from "react-hot-toast";

interface MintProps {
  children: React.ReactNode;
  tokenAccount?: string;
}

export interface FormState {
  coverimage: File | null;
  description: string;
}

function AttestPDF({ children, tokenAccount }: MintProps) {
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

  const [open, setOpen] = useState(false);
  const [coverImage, setCoverImage] = useState("/");

  const [tab, setTab] = useState(0);
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
  const [instance] = usePDF({ document: <Template /> });
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const numTabs = 2;

  const handleNextClick = () => {
    if (tab < numTabs - 1) {
      setTab(tab + 1);
    }
  };

  const renderTabs = () => {
    const tabs = [];
    for (let i = 0; i < numTabs; i++) {
      tabs.push(
        <div
          key={i}
          className={`mx-1 mt-1 mb-4 rounded-lg cursor-pointer hover:h-[6px] ${
            tab === i
              ? "bg-[#3D00B7] h-[6px] w-[25px] lg:w-[35px]"
              : "bg-gray-400 h-[5px] lg:w-[28px] w-[20px]"
          }`}
          onClick={() => setTab(i)}
        ></div>
      );
    }
    return tabs;
  };

  const [inputValues, setInputValues] = useState<FormState>({
    coverimage: null,
    description: "",
  });
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

  const isFormFilled = (inputValues: FormState): boolean => {
    return inputValues.description !== "" && inputValues.coverimage !== null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormFilled(inputValues)) {
      const blob = await pdf(<Template />).toBlob();
      // await UploadPDF(inputValues, tokenAccount as string);
      //
      toast.success("Attestation Minted", {
        duration: 5000,
        position: "bottom-right",
      });
      window.location.reload();
      if (anchorRef.current) {
        anchorRef.current.click();
      }
    }
    console.log("Fill input fields");
  };

  useEffect(() => {
    if (!open) {
      setTab(0);
      setInputValues({ coverimage: null, description: "" });
    }
  }, [open]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[24]"
          onClick={(e) => e.stopPropagation()}
        />
        <AlertDialog.Content
          onClick={(e) => e.stopPropagation()}
          className="fixed focus:outline-none drop-shadow-md border top-[50%] left-[50%] lg:left-auto lg:w-[45vw] w-[85vw] z-[25] border-neutral-700 lg:top-7 md:top-7 lg:translate-y-0 lg:translate-x-0 md:translate-y-0 md:translate-x-0 translate-y-[-50%] translate-x-[-50%] lg:right-0 rounded-md lg:rounded-tl-[20px] lg:rounded-bl-[20px] bg-white p-[25px]"
        >
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
          <div className={`block p-6 w-full relative`}>
            <div className="flex justify-center items-center">
              {renderTabs()}
            </div>
            <form
              className={`w-full h-[65vh] space-y-7`}
              onSubmit={handleSubmit}
            >
              {tab === 0 && (
                <div className={`space-y-5 w-full`}>
                  <fieldset className={`flex flex-col w-[80%] mx-auto`}>
                    <label
                      htmlFor="coverimage"
                      className={`block my-1 font-semibold text-[16px]`}
                    >
                      Cover Image
                    </label>
                    <input
                      type="file"
                      onChange={(event) =>
                        handleFileChange(event, "coverimage")
                      }
                      name="coverimage"
                      id="image"
                      className={`rounded-[15px] block text-[14px] w-[100%] mx-auto mt-2 h-[30px] py-[2px] border ps-3`}
                    />
                  </fieldset>
                  <textarea
                    name="description"
                    placeholder="Describe your NFT"
                    value={inputValues.description}
                    onChange={handleInputChange}
                    className={`p-4 block mx-auto  w-[90%] h-[140px] rounded-[15px] border`}
                  />
                </div>
              )}

              {tab === 1 && (
                <div className={`space-y-6 w-full mt-3 h-[70%]`}>
                  {/* <PDFViewer
                    className={`w-[80%] h-[70%] rounded-[10px] block mx-auto`}
                  >
                    <Template />
                  </PDFViewer> */}
                </div>
              )}
              <button
                className={`rounded-[20px] ${
                  tab === 1 ? "visible" : "invisible"
                } flex w-[130px] mx-auto text-white bg-[#3D00B7] hover:opacity-75 active:opacity-60 h-[35px] border justify-center items-center`}
                type="submit"
              >
                Submit
              </button>
              <button
                onClick={handleNextClick}
                type="button"
                className={`rounded-[20px] ${
                  tab === 0 ? "visible" : "invisible"
                } disabled:bg-slate-400 flex w-[130px] disabled:hover:opacity-100 mx-auto text-white bg-[#3D00B7] hover:opacity-75 active:opacity-60 h-[35px] border justify-center items-center`}
              >
                Next
              </button>
              <a
                href={instance.url as string}
                className={`hidden`}
                download={`testament.pdf`}
                ref={anchorRef}
              >
                Download
              </a>
            </form>
          </div>
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

export default AttestPDF;
