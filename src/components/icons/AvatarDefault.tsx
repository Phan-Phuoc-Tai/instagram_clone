type Props = {
  width: string;
  height: string;
};
export default function AvatarDefault({ width, height }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle
          cx="12"
          cy="6"
          r="4"
          stroke="#000000"
          strokeWidth="1.5"
        ></circle>{" "}
        <path
          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
          stroke="#000000"
          strokeWidth="1.5"
        ></path>{" "}
      </g>
    </svg>
  );
}
