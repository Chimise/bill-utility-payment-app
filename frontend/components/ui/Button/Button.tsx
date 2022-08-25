import cn from 'classnames'
import React, {
  ButtonHTMLAttributes,
  JSXElementConstructor,
} from 'react'
import styles from './Button.module.css'


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'flat' | 'slim' | 'ghost'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  width?: string | number
  loading?: boolean
  disabled?: boolean,
  Component?: string | JSXElementConstructor<any>,
  children: React.ReactNode
}




// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
 

  const rootClassName = cn(
    styles.root,
    {
      [styles.ghost]: variant === 'ghost',
      [styles.slim]: variant === 'slim',
      [styles.loading]: loading,
      [styles.disabled]: disabled,
    },
    className
  )

  

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      ref={ref}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <span className={styles.progress}>
            <span className={cn(styles['progress-inner'], 'animate-spin')}></span>
          </span>
        </i>
      )}
    </Component>
  )
});

export default Button
