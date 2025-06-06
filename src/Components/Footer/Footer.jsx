import { motion } from "framer-motion"; // Fixed import
import logo from '../../assets/logo_dark.svg';

function Footer() {
  return (
    <motion.div 
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: -10, opacity: 0 }}
      transition={{
        y: { duration: 0.5, ease: "easeIn" },
        opacity: { duration: 0.5, ease: "easeIn" },
      }}
      viewport={{ once: true }}
      className="relative z-20 left-0 bottom-0 w-full">

      <footer className="footer w-full px-4 sm:px-10 py-4 sm:py-2 bg-neutral text-neutral-content flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        
        {/* Logo */}
        <aside className="flex items-center justify-center sm:justify-start w-full sm:w-auto mb-2 sm:mb-0">
          <img className="hover:cursor-pointer w-32 sm:w-40" src={logo} alt="Logo" />
        </aside>
        
        {/* Copyright */}
        <div className="text-xs sm:text-sm text-center sm:text-left order-3 sm:order-2 mt-2 sm:mt-0">
          Copyright © {new Date().getFullYear()} - All right reserved
        </div>

        {/* Social Icons */}
        <nav className="flex items-center justify-center sm:justify-end gap-4 w-full sm:w-auto order-2 sm:order-3">
          <div className="hover:text-blue-600 hover:cursor-pointer p-1">
            <a aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current w-5 sm:w-6 h-5 sm:h-6"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
          </div>

          <div className="hover:text-red-600 hover:cursor-pointer p-1">
            <a aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current w-5 sm:w-6 h-5 sm:h-6"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
          </div>

          <div className="hover:text-blue-600 hover:cursor-pointer p-1">
            <a aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current w-5 sm:w-6 h-5 sm:h-6"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </motion.div>
  );
}

export default Footer;