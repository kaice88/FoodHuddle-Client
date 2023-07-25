import { NavLink as RouterNavLink } from 'react-router-dom';
import { NavLink } from '@mantine/core';
import classNames from 'classnames';
interface MainLinkProps {
  icon: React.ReactNode;
  url: string;
  label: string;
}
export default function NavigationLink({ icon, label, url }: MainLinkProps) {
  // TODO: remove underline
  return (
    <RouterNavLink to={url} className="menu_item" style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <NavLink
          label={label}
          active={isActive}
          icon={icon}
          className={classNames({ 'custom-navlink': isActive })}
        />
      )}
    </RouterNavLink>
  );
}
