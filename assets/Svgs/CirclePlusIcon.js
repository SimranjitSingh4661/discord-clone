import * as React from "react";
const SVGComponent = (props) => (
  <svg
    aria-hidden="true"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width={"100%"}
    height={"100%"}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={10} fill="transparent" className="" />
    <path
      fill="white"
      fillRule="evenodd"
      d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-17a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
      className="attachButtonPlus_bf89ca"
    />
  </svg>
);
export default SVGComponent;
