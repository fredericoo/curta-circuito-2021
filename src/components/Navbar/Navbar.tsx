import { useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

export type NavbarProps = {
  menuItems: { label: string; path: string }[];
};

const Navbar: React.VFC<NavbarProps> = ({ menuItems }) => {
  const [isLargeScreen] = useMediaQuery('(min-width: 1200px)');

  const [display, setDisplay] = useState(false);
  useEffect(() => setDisplay(true), []);

  const NavbarComponent = !isLargeScreen ? NavbarMobile : NavbarDesktop;

  if (!display) return null;
  return <NavbarComponent key={isLargeScreen ? 'desktop' : 'mobile'} menuItems={menuItems} />;
};

export default Navbar;
