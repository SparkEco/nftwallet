function IsLoading() {
  const colors = ["#a3d4f7", "#b3e4ff", "#fff"];
  return (
    <div className="h-[90vh] w-full flex justify-center items-center bg-black bg-opacity-10">
      <div className={`wrapper`}>
        <div className="cont">
          {colors.map((color, index) => (
            <svg
              key={index}
              viewBox="0 -87 463.83425 463"
              xmlns="http://www.w3.org/2000/svg"
              className={`svg`}
              style={{
                animationDelay: `${-0.2 * index}s`,
              }}
            >
              <path
                d="m375.835938 112.957031c-5.851563 0-11.691407.582031-17.425782 1.742188-4.324218-21.582031-18.304687-39.992188-37.933594-49.957031-19.625-9.964844-42.738281-10.382813-62.714843-1.136719-18.078125-49.796875-73.101563-75.507813-122.898438-57.429688s-75.507812 73.105469-57.429687 122.898438c-43.621094 1.378906-78.078125 37.484375-77.4257815 81.121093.6562495 43.640626 36.1835935 78.691407 79.8281255 78.761719h296 c48.597656 0 88-39.398437 88-88 0-48.601562-39.402344-88-88-88zm0 0"
                fill={color}
              />
            </svg>
          ))}
        </div>
        <p className="palo">Loading...</p>
      </div>
    </div>
  );
}

export default IsLoading;
