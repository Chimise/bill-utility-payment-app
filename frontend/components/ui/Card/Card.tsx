import React from 'react';
import cn from 'classnames';

interface CardProps {
    children: React.ReactNode,
    className?: string
}

const Card = ({children, className}: CardProps) => {
    
    return (
        <div className={cn('shadow-md bg-white rounded-md', className)}>{children}</div>
    )
}


export default Card;