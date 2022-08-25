import React from 'react';

import Link, {LinkProps}  from 'next/link';

interface MenuLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    href: LinkProps['href'];
}

const MenuLink = React.forwardRef<HTMLAnchorElement, MenuLinkProps>(({href, children, ...rest}: MenuLinkProps, ref) => {
    return (<Link href={href}>
        <a ref={ref} {...rest}>{children}</a>
    </Link>)
})

MenuLink.displayName = 'MenuLink';


export default MenuLink;

