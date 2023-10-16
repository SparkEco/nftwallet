import { IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
const myFont = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "700"],
});

import Image from "next/image";

function Footer() {
  return (
    <>
      <div className="lg:flex block justify-around lg:px-[80px] px-3 lg:py-[120px] py-[30px] lg:h-[60vh] h-fit w-full lg:space-y-0 space-y-4">
        <div className="block lg:w-[333px] w-[250px] space-y-4 mx-auto">
          <div className={`flex items-center space-x-1`}>
            <Image
              src={`/logo2.png`}
              alt="logo"
              width={28}
              height={28}
              className={`lg:w-[28px] lg:h-[28px] w-[22px] h-[22px]`}
            />
            <p
              className={`${myFont.className} text-[#3D00B7] font-[700] lg:text-[25px] text-[18px]`}
            >
              ImpactScribe
            </p>
          </div>
          <p className={`  lg:text-[14px] text-[10px] text-[#565656]`}>
            ImpactScribe is a protocol for minting Impact Certificates with
            Token Bound Accounts which are used to store Claim of Impact and
            Proof of Impact NFTs using several composable impact claim and
            evaluation tools.
          </p>
          <div className="flex space-x-2 items-center lg:justify-start justify-center">
            <Link href={`https://twitter.com/spark_eco`}>
              <Image
                className="lg:h-[36px] w-[20px] h-[20px] lg:w-[36px]"
                src={`/twitter.png`}
                width={36}
                height={36}
                alt="social"
              />
            </Link>
            <Link href={`mailto:info@spark.eco`}>
              <Image
                className={`lg:h-[36px] w-[20px] h-[20px] lg:w-[36px]`}
                src={`/email.png`}
                width={36}
                height={36}
                alt="social"
              />
            </Link>
            <Link href={`https://t.me/jonruth`}>
              <Image
                className={`lg:h-[36px] w-[20px] h-[20px] lg:w-[36px] rounded-[50%]`}
                src={`/telegram.png`}
                width={36}
                height={36}
                alt="social"
              />
            </Link>
            <Link href={`https://discord.com/invite/Tt42HGxvKU`}>
              <Image
                className="lg:h-[36px] w-[20px] h-[20px] lg:w-[36px] rounded-[50%]"
                src={`/discord.png`}
                width={36}
                height={36}
                alt="social"
              />
            </Link>
          </div>
        </div>
        <div className={`  block lg:mx-0 mx-auto lg:text-start text-start`}>
          <h1 className={`font-bold lg:text-[18px] text-[15px]`}>
            Marketplace
          </h1>
          <ul
            className={`lg:text-[14px] text-[10px] text-[#3D3D3D] font-medium lg:mt-4 mt-2 lg:space-y-1 space-y-[0.10rem]`}
          >
            <li>All NFTs</li>
            <li>New</li>
            <li>Art</li>
            <li>Sports</li>
            <li>Utility</li>
            <li>Music</li>
            <li>Domain name</li>
          </ul>
        </div>
        <div className={`  block mx-auto `}>
          <h1 className={`font-bold lg:text-[18px] text-[15px]`}>Account</h1>
          <ul
            className={`lg:text-[14px] text-[10px] text-[#3D3D3D] font-medium lg:mt-4 mt-2 space-y-1`}
          >
            <li>Profile</li>
            <li>Favorites</li>
            <li>My Collection</li>
            <li>Settings</li>
          </ul>
        </div>
        <div
          className={`  block lg:w-[364px] w-[250px] mx-auto lg:text-start text-center`}
        >
          <h1 className={`font-bold lg:text-[18px] text-[15px]`}>
            Stay in the loop
          </h1>
          <p
            className={`  text-[10px] lg:text-[14px] text-[#363639] lg:mt-4 mt-2`}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            natus eius magni? Numquam
          </p>
          <div className="flex lg:w-[364px] w-[280px] h-[60px] border rounded-[45px] items-center mt-4">
            <input
              type="text"
              placeholder="Enter your email address"
              className="pl-5 h-[55px] rounded-[45px] outline-none lg:w-fit w-[200px] lg:text-[18px] text-[14px]"
            />
            <button className="border lg:w-[150px] w-[100px] h-[46px] mr-1 bg-[#2639ED] hover:opacity-75 text-white rounded-[45px] lg:text-[11px] text-[10px] border-[#2639ED]">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="block w-full py-[20px]">
        <p className={`  text-[#A4A4A4] text-[14px] text-center`}>
          Copyright © 2023 ImpactScribe
        </p>
      </div>
    </>
  );
}

export default Footer;
