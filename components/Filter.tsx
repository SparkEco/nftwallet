function Filter() {
  return (
    <div
      className={`flex w-[80%] justify-start px-6 items-center my-[20px] shadow mx-auto h-[70px] rounded-lg`}
    >
      <button
        type="button"
        className={`flex w-[130px] h-[35px] rounded-[10px] border justify-center items-center space-x-2`}
      >
        Filter
        <svg
          className="-mr-1 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default Filter;
