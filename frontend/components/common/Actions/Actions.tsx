import Link from "next/link";
import cn from 'classnames';

const classes = 'inline-block capitalize rounded-md leading-[48px] pointer-cursor border transition-colors duration-100 border-blue-500 w-32 h-12'

const Actions = () => {
  return (
    <section className='py-12 space-y-6 bg-white'>
      <header className="text-center">
        <h3 className="text-3xl sm:text-4xl font-semibold">Ready To Get Started?</h3>
      </header>
      <div className='text-center space-x-5'>
          <Link href="/login">
            <a className={cn(classes, 'text-blue-500 hover:bg-blue-500 hover:text-white')}>Login</a>
          </Link>
          <Link href="/register">
            <a className={cn(classes, 'bg-blue-500 text-white hover:bg-blue-900 hover:border-blue-900')}>Get Started</a>
          </Link>
        </div>
    </section>
  );
};

export default Actions;
