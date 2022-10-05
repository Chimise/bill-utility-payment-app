import React from 'react';
import Button from '../Button/Button';
import cn from 'classnames';

interface ErrorProps {
    error: string,
    onRetry: () => void,
    className?: string
}

const Error = ({error, onRetry, className}: ErrorProps) => {
    return (<div className={cn("flex items-center align-center flex-col space-y-3", className)}>
    <div className="text-slate-400 font-light text-sm">{error}</div>
    <Button variant="slim" className="bg-sky-700 hover:bg-sky-900" onClick={onRetry}>Try Again</Button>
  </div>)
}

export default Error;