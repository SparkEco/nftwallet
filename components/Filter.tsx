"use client";

import { useEffect, useState } from "react";
import { getOwnedTokens } from "@/actions/clientActions";
import { getAll, getGeojson } from "@/actions/serverActions";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import { getData } from "@/redux/slices/nfts.slice";
import { setGeoJson } from "@/redux/slices/geojson.slice";
import FilterButton from "./FilterButton";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface FilterProps {
  issuer?: string | null;
  setIsloading?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Filter({ issuer, setIsloading }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  let currentFilter =
    parseInt(window.sessionStorage.getItem("filter") as string) || 0;
  const [selectedFilter, setSelectedFilter] = useState(currentFilter);
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const web3ModalState = useWeb3ModalState();
  const filters: { name: string; method: () => Promise<void> }[] = [
    {
      name: "Listings",
      method: async function getListings() {
        try {
          dispatch(getData([]));
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          window.sessionStorage.setItem("filter", "0");
          setSelectedFilter(0);
          router.push("/explore");
        } catch (error) {
          console.error("Error setting data:", error);
        }
      },
    },

    {
      name: "My ImpactCerts",
      method: async function getMyImpactCerts() {
        try {
          if (!isConnected) {
            toast("Connect your wallet", {
              icon: "💼",
              duration: 5000,
              position: "top-center",
            });
            return;
          }
          dispatch(getData([]));
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setSelectedFilter(1);
          window.sessionStorage.setItem("filter", "1");
          router.push(`/explore?filter=${address}`);
        } catch (err) {
          console.error("Failed to fetch owned NFTS:", err);
        }
      },
    },
    {
      name: "Switch Electric",
      method: async () => {
        try {
          dispatch(getData([]));
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setSelectedFilter(2);
          window.sessionStorage.setItem("filter", "2");
          router.push(
            `/explore?filter=0xb2403f83C23748b26B06173db7527383482E8c5a`
          );
        } catch (err) {
          console.error("Failed to fetch account impactCerts");
        }
      },
    },
    {
      name: "SparkEco",
      method: async () => {
        try {
          dispatch(getData([]));
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setSelectedFilter(3);
          window.sessionStorage.setItem("filter", "3");
          router.push(
            `/explore?filter=0x3d02003EF41589Be90da67B4b7DaCfC76eed71De`
          );
        } catch (err) {
          console.error("Failed to fetch account impactCerts");
        }
      },
    },
  ];

  const start = issuer?.slice(0, 6);
  const finish = issuer?.slice(-5);
  return (
    <>
      <div className={`block lg:w-[80%] w-[98%] mx-auto relative`}>
        <div
          className={`flex w-full justify-start lg:px-6 px-2 border items-center my-[20px] shadow mx-auto lg:h-[70px] h-[60px] rounded-lg`}
        >
          <div className={`flex items-center lg:space-x-2 space-x-[4px]`}>
            {filters.map((item, index) => (
              <FilterButton
                key={index}
                name={item.name}
                click={() => {
                  item.method();
                }}
                isSelected={selectedFilter === index}
              />
            ))}
            {issuer && (
              <div
                className={`flex space-x-1 lg:visible md:visible invisible items-center`}
              >
                <p className={`text-[12px]`}>You are filtering by:</p>
                <FilterButton
                  name={`${start}...${finish}`}
                  click={() => {}}
                  isSelected={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex space-x-1 sm:visible lg:invisible md:invisible xl:invisible items-center`}
      >
        <p className={`text-[12px]`}>You are filtering by:</p>
        <FilterButton
          name={`${start}...${finish}`}
          click={() => {}}
          isSelected={false}
        />
      </div>
    </>
  );
}

export default Filter;
