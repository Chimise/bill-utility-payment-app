import { ReactNode, Fragment, useState, useEffect } from "react";
import throttle from "lodash.throttle";
import NavBar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import HeaderChip from '../HeaderChip/HeaderChip';
import Toast from '../../ui/Toast/Toast';
import useUI from '../../../hooks/useUI'; 

// import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const uiContext = useUI();

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0;
      const { scrollTop } = document.documentElement;
      const scrolled = scrollTop > offset;

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled);
      }
    }, 200);

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  return (
    <Fragment>
      <NavBar hasScrolled={hasScrolled} />
      <div id='back-to-top'></div>
      <Toast message={uiContext.message} isVisible={uiContext.toastIsVisible} status={uiContext.status} onClose={uiContext.closeToastHandler} />
      <main>{children}</main>
      <Footer />
      <HeaderChip isVisible={hasScrolled} />
    </Fragment>
  );
};

export default Layout;
