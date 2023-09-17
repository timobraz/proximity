import React from "react";

interface LogoI {
  tw: string;
}
export default function Logo(props: LogoI) {
  return <img src="logo3.png" alt="logo" className={"w-[50px] py-3 cursor-pointer " + props.tw} />;
}
