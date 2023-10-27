import "@/app/compass.css";

function Compass() {
  return (
    <div
      className={`w-full lg:h-[99vh] md:h-[99vh] h-[60vh] flex justify-center bg-[#222] items-center`}
    >
      <div
        className={`panel lg:w-[590px] lg:h-[590px] md:w-[550px] md:h-[550px] w-[300px] h-[300px]`}
      >
        <div className="scanner"></div>
        <ul className="something">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Compass;
