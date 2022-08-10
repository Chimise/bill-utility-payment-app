import styles from "./Loader.module.css";
import {Transition} from '@headlessui/react';

interface LoaderProps {
    isVisible: boolean;
}

const Loader = ({isVisible}: LoaderProps) => {
  return (
    <Transition className={styles.root} show={isVisible} enter='transition-opacity duration-100' enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity" leaveFrom="opacity-100" leaveTo="opacity-0" >
      <div className={styles.loader}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </Transition>
  );
};

export default Loader;
