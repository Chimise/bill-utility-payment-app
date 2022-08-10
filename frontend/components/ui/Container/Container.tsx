import cn from 'classnames'
import React from 'react'

interface ContainerProps {
  className?: string
  children: React.ReactNode,
  fullWidth?: boolean,
}

const Container = ({
  children,
  className, 
  fullWidth,
}: ContainerProps) => {
  const rootClassName = cn({
    'mx-auto max-w-[1200px] px-8 md:px-5': !fullWidth,
  }, className)

  
return <div className={rootClassName}>{children}</div>
}

export default Container