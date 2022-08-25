import React from "react";
import cn from "classnames";


interface RadioButtonProps {
  checked: boolean;
  className?: string;
}



const RadioButton = ({ checked, className }: RadioButtonProps) => {
  return (
    <div
      className={cn(
        "w-[18px] h-[18px] rounded-full flex justify-center items-center transition-all border-2",
        { "border-slate-900": checked, "border-gray-700": !checked },
        className
      )}
    >
      <div
        className={cn("rounded-full bg-slate-900 transition-all", {
          "w-2 h-2": checked,
          "w-0 h-0": !checked,
        })}
      />
    </div>
  );
};


export default RadioButton;


