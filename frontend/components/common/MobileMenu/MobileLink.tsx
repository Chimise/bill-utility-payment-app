import React from 'react';

import NextLink, {LinkProps as NextLinkProps} from 'next/link';

import CustomLink from './Link';





interface MobileMenuProps extends Omit<NextLinkProps, 'passHref'> {
    children: React.ReactNode;
    onCloseMenu: () => void;
    className?: string;
}


const MobileLink = ({href,children, onCloseMenu, className, ...props}: MobileMenuProps) => {
    return (<NextLink href={href} passHref {...props}>
        <CustomLink className={className} onCloseMenu={onCloseMenu}>{children}</CustomLink>
    </NextLink>)
}



export default MobileLink;