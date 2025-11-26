import React from "react";
import { twMerge } from "tailwind-merge";

const Text = ({ children, className = "" }) => {
  return <p className={twMerge("font-sans", className)}>{children}</p>;
};

export default Text;