import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

interface SpinnerProps {
    className?: string
}

const Spinner = ({className}: SpinnerProps) => {
    return (<div className={cn("flex items-center justify-center", className)}>
    <FontAwesomeIcon icon={['fas', 'spinner']} spin size="4x" />
  </div>)
}

export default Spinner;