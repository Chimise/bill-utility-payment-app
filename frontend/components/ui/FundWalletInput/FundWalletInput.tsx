import React from "react";
import cn from "classnames";

interface FundWalletInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<any>) => void;
  error: string | false;
  className?: string;
  name: string;
  label: string;

}

const FundWalletInput = ({
  onChange,
  error,
  className,
  id,
  name,
  label,
  ...rest
}: FundWalletInputProps) => {
  const rootClassName = cn(
    "block w-full px-3 py-2 bg-white rounded-r-md border border-transparent text-sm placeholder-slate-400 focus:outline-none focus:ring-0",
    { "focus:border-pink-500": error, "focus:border-gray-700": !error }, className
  );

  return (
    <div>
    <label htmlFor={name} className='text-sm mb-1 block text-gray-700 font-medium'>{label}:</label>
      <div className="flex shadow-md rounded-md border border-gray-700 bg-gray-700">
        <div className="shrink-0 py-2 px-4 border-0 border-r rounded-l-md text-white border-slate-700">
          NGN (&#8358;)
        </div>
        <div className="flex-1 flex items-stretch">
          <input
            type="text"
            className={rootClassName}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            id={name}
            name={name}
            onChange={onChange}
            {...rest}
          />
        </div>
      </div>
      {error && (
        <div className="text-pink-500 text-xs font-light mt-2">{error}</div>
      )}
    </div>
  );
};

export default FundWalletInput;
