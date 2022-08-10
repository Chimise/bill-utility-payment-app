import Link from "next/link";

import Container from "../../ui/Container/Container";
import CopyRight from "./CopyRight";

const Footer = () => {
  return (
    <footer className="bg-blue-900 pt-14">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 justify-between gap-x-5 gap-y-6">
          <div className="md:col-span-2">
            <h4 className="text-slate-200 text-xl mb-6">Contact Information</h4>
            <ul className='space-y-3'>
              <li>
                <span className="font-semibold text-white">Address{" "}:</span>{" "}
                <address className="inline not-italic text-slate-50">
                  Nigeria Army Post service Housing estate opposite Lasu Gate
                  Ojo, Lagos State.
                </address>
              </li>
              <li>
                <span className="font-semibold text-white">Phone{" "}:</span>{" "}
                <a href="tel:+2349046165168" className="hover:text-blue-500 text-slate-50" >+2349046165168</a>
              </li>
              <li>
              <span className="font-semibold text-white">Email{" "}:</span>{" "}
                <a href="mailto:support@nccommtech.com" className="hover:text-blue-500 text-slate-50">
                  support@nccommtech.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-200 text-xl mb-6">Account</h4>
            <ul className="space-y-3">
              <li>
                <Link href="login">
                  <a className="hover:text-blue-500 text-slate-50">Login</a>
                </Link>
              </li>
              <li>
                <Link href="register">
                  <a className="hover:text-blue-500 text-slate-50">Register</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-200 text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="pricing">
                  <a className="hover:text-blue-500 text-slate-50">Pricing</a>
                </Link>
              </li>
              <li>
                <Link href="company">
                  <a className="hover:text-blue-500 text-slate-50">Company</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <CopyRight className='mt-10' />
      </Container>
    </footer>
  );
};

export default Footer;
