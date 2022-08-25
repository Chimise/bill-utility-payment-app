import React from "react";
import cn from "classnames";

import styles from "./Header.module.css";

interface HeaderProps {
  children: React.ReactNode;
  menuIsVisible: boolean;
  hasScrolled: boolean;
}

const Header = (props: HeaderProps) => {
  return (
    <header
      className={cn(styles.root, {
        "shadow-lg": props.hasScrolled && !props.menuIsVisible,
      })}
    >
      {props.children}
    </header>
  );
};

export default Header;
