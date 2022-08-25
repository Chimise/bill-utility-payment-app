import React, { InputHTMLAttributes} from "react";
import cn from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<any>) => void;
  className?: string;
  label: string;
  error?: string | false;
  borderClass?:string
}



const Input = ({ onChange, className, label, error, borderClass,  ...rest }: InputProps) => {
  
  const rootClassName = cn("block w-full mt-1 px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none", {'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': error, [`border-slate-300 ${borderClass ? borderClass : 'focus:border-sky-500 focus:ring-sky-500'}`]: !error}, className);


  return (
    <label className="block">
      <span className="block font-medium text-sm text-slate-700">{label}</span>
      <input
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={rootClassName}
        onChange={onChange}
        {...rest}
      ></input>
      <p className={cn("transition-opacity text-pink-500 text-xs font-light mt-1 h-2", {'opacity-0': !error, 'opacity-100': error})}>{error && error}</p>
    </label>
  );
};


export default Input;