import React, {useState, Fragment} from "react";
import Link from "next/link";
import cn from 'classnames';
import Image from 'next/image';


import Container from '../../ui/Container/Container';
import Button from '../../ui/Button/Button';
import Header from "./Header";
import MobileMenu from '../MobileMenu/MobileMenu';


import styles from './Header.module.css';
import LogoImage from '../../../assets/Logo.png';

interface NavBarProps {
  hasScrolled: boolean;
}


const links = [
  { href: "/", title: "Home" },
  { href: "/company", title: "Company" },
  { href: "/pricing", title: "Pricing" },
  { href: "/contact", title: "Contact" },
];



const NavBar = (props: NavBarProps) => {
  const [navIsVisible, setNavIsVisible] = useState(false);

  const toggleNavHandler = () => {
    setNavIsVisible(prevNavIsVisible => !prevNavIsVisible);
  }

  const closeMenuHandler = () => {
    setNavIsVisible(false);
  }

  return (
    <div className="sticky z-50 top-0 left-0">
    <Header menuIsVisible={navIsVisible} hasScrolled={props.hasScrolled}>
      <Container className={styles.container}>
        <div className="shrink-0 mr-4 xl:mr-20 inline-flex justify-center items-center">
          <Link href='/'>
          <a className='inline-block w-40 md:w-42 lg:w-48'>
            <Image src={LogoImage} alt='Nccomtech Logo' priority />
          </a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navlist}>
            {links.map((link, index) => {
              return (
                <li key={index.toString()} className='inline-block'>
                  <Link href={link.href}>
                    <a className={cn(styles.list, 'text-slate-700 hover:text-blue-300')}>{link.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className={styles.navlist}>
            <li className='inline-block'>
              <Link href="/auth/login">
                <a className={cn(styles.list, "hover:text-blue-500")}>Log In</a>
              </Link>
            </li>
            <li className='inline-block'>
              <Link href="/auth/register" passHref>
                <Button Component='a'>create new account</Button>
              </Link>
            </li>
          </ul>
        </nav>

        <div className='transition-colors duration-100 group inline-flex w-10 h-10 py-1 px-1.5 justify-around items-stretch border bg-transparent border-blue-500 cursor-pointer hover:ring-1 hover:ring-border-slate-900 hover:ring-offset-1 hover:bg-slate-600 md:hidden flex-col rounded' onClick={toggleNavHandler}>
          <span className={cn("w-full relative h-1 bg-blue-900/75 group-hover:bg-white transition-transform duration-75 before:absolute before:w-full before:h-full  before:bottom-2 before:bg-blue-900/75 after:absolute after:w-full after:h-full after:top-2 after:bg-blue-900/75 group-hover:before:bg-white group-hover:after:bg-white", {'rotate-45 before:top-0 after:top-0 before:rotate-90 after:rotate-90': navIsVisible})}>
          </span>
          
        </div>

      </Container>
            
    </Header>
    <MobileMenu isVisible={navIsVisible} onClick={closeMenuHandler} />
</div>
  );
};

export default NavBar;
