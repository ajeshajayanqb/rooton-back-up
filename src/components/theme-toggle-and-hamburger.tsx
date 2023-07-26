'use client';

import DarkModeIcon from '@/icons/darkmode.icon';
import HamburgerIcon from '@/icons/hamburger.icon';
import LightModeIcon from '@/icons/lightmode.icon';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import RTONLanguageDropDown from './RTONLanguageDropDown';

type ThemeToggleAndHamburgerProps = {
  scrolledEnough: boolean;
  toggleSlideOverlay: () => void;
};

export default function ThemeToggleAndHamburger({ scrolledEnough, toggleSlideOverlay }: ThemeToggleAndHamburgerProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setIsDarkMode((state) => !state);
  }, [theme]);

  return (
    <div
      className="
        flex
        items-center
        hover:cursor-pointer
        gap-4
      "
    >
      <div className=' hidden mr-[19px] lg:block'>
        <RTONLanguageDropDown scrolledEnough={scrolledEnough} />
      </div>
      <div className=" flex gap-0 w-12 lg:w-16 lg:h-8 h-6" role="button" tabIndex={0} onClick={toggleTheme}>
        {!scrolledEnough ? (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              isDarkMode ? ' bg-white' : ' bg-tansparent-bg'
            } flex justify-center items-center`}
          >
            <DarkModeIcon isScrolled={scrolledEnough} />
          </span>
        ) : (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              isDarkMode ? 'bg-toggle-dark-bg' : 'bg-tansparent-bg'
            } flex justify-center items-center`}
          >
            <DarkModeIcon isScrolled={scrolledEnough} />
          </span>
        )}
        {scrolledEnough ? (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              !isDarkMode ? ' bg-toggle-dark-bg' : 'bg-tansparent-bg'
            } flex justify-center items-center`}
          >
            <LightModeIcon isScrolled={scrolledEnough} />
          </span>
        ) : (
          <span
            style={{ transition: 'background-color 0.2s' }}
            className={` w-1/2 h-full ${
              !isDarkMode ? 'bg-white' : 'bg-tansparent-bg'
            } flex justify-center items-center`}
          >
            <LightModeIcon isScrolled={scrolledEnough} />
          </span>
        )}
      </div>
      <button type="button" onClick={toggleSlideOverlay} className=" lg:hidden">
        <HamburgerIcon isScrolled={scrolledEnough} />
      </button>
    </div>
  );
}
