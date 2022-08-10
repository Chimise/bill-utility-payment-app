import React, { InputHTMLAttributes, useState } from "react";
import cn from "classnames";
import {EyeIcon, EyeOffIcon} from '@heroicons/react/outline';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: any) => void;
  className?: string;
  label: string;
  error?: string | false;
  type?: 'password';
  borderClass?: string;
}

const InputPassword = ({ onChange, className, label, error, type, borderClass, ...rest }: InputProps) => {

    const [isPassword, setisPassword] = useState(true);

     const inputType = type || 'password';

    const toogleIsPasswordHandler = () => {
        setisPassword(prevState => !prevState);
    }

    const iconClassName = 'w-5 h-3 text-slate-700'
  
  const rootClassName = cn("block apperance-none w-full mt-1 pl-3 pr-14 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none", {'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': error, [`border-slate-300 ${borderClass ? borderClass : 'focus:border-sky-500 focus:ring-sky-500'}`]: !error}, className);

  return (
    <label className="block">
      <span className="block font-medium text-sm text-slate-700">{label}</span>
      <span className="block w-full relative">
      <input
        className={rootClassName}
        onChange={onChange}
        type={isPassword ? inputType : 'text'}
        {...rest}
      ></input>
      <span onClick={toogleIsPasswordHandler} className="absolute inset-y-0 right-0 h-full w-14 flex items-center justify-center rounded-l-md">
            {isPassword ? <EyeIcon className={iconClassName} /> : <EyeOffIcon className={iconClassName} />}
      </span>
      </span>
      <p className={cn("transition-opacity text-pink-500 text-xs font-light mt-1 h-2", {'opacity-0': !error, 'opacity-100': error})}>{error && error}</p>
    </label>
  );
};


export default InputPassword;