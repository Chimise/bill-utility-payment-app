import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import cn from 'classnames';


interface SpinnerProps {
    className?: string,
    size?: FontAwesomeIconProps['size']
}

const Spinner = ({className, size = '4x'}: SpinnerProps) => {
    return (<div className={cn("flex items-center justify-center", className)}>
    <FontAwesomeIcon color="#075985" icon={['fas', 'spinner']} spin size={size} />
  </div>)
}

export default Spinner;