import React from 'react';

import {LinkProps} from 'next/link';

interface CustomLinkProps {
    href?: LinkProps['href'];
    onClick?: () => void;
    children: React.ReactNode;
    onCloseMenu: () => void;
    className?: string
}




// eslint-disable-next-line react/display-name
const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(({onClick, href, children, onCloseMenu, className}, ref) => {
    const clickHandler = () => {
        onCloseMenu();
        if(onClick) {
            onClick()
        }
    };

    const url = typeof href === 'object' ? href.pathname! : href;

    return (<a ref={ref} href={url} onClick={clickHandler} className={className}>{children}</a>)
})




export default CustomLink;