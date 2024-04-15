import { useClickAway } from 'react-use';
import { useRef } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { routes } from './Routes';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';
import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import TabletIcon from '@mui/icons-material/Tablet';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const { user, isAuthenticated } = useAuth0();

  useClickAway(ref, () => setOpen(false));

  return (
    <div
      ref={ref}
      className="lg:hidden fixed top-0 right-0 z-50"
      style={{ color: 'white', marginTop: '10px' }}
    >
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} color="#fff" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20"
          >
            {' '}
            <ul className="grid gap-2">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                  >
                    <a
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        'flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950'
                      }
                      href={route.href}
                    >
                      <span className="flex gap-1 text-lg">{route.title}</span>
                      <Icon className="text-xl" />
                    </a>
                  </motion.li>
                );
              })}
              {isAuthenticated ? (
                <motion.li
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 + 5 / 10,
                  }}
                  className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                >
                  <a
                    onClick={() => setOpen((prev) => !prev)}
                    className={
                      'flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950'
                    }
                    href="/my-orders"
                  >
                    <span className="flex gap-1 text-lg">My Orders</span>
                    <MenuBookIcon className="text-xl" />
                  </a>
                </motion.li>
              ) : null}
            </ul>
            <div style={{ color: 'white', margin: '20px', marginTop: '30px' }}>
              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
