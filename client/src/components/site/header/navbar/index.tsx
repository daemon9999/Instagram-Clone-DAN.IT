
import { RiHome2Fill, RiHome2Line, RiMessengerFill,RiMessengerLine, RiUser3Fill, RiUser3Line  } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";
import {MdOutlineFavoriteBorder, MdOutlineFavorite} from "react-icons/md"
import {IoMdNotificationsOutline, IoMdNotifications} from "react-icons/io"
import {FiLogOut} from "react-icons/fi"
import { useDispatch } from "react-redux";
import { logOut } from "src/store/auth-slice";
interface NavItemProps {
  id: number;
  href?: string;
  activeIcon: IconType;
  passiveIcon: IconType;
  onClick?: () => void;
  size: number;
  additionalStyle?: string
}

export default function Navbar() {
  const dispatch = useDispatch()

  const navItems: NavItemProps[] = [
    {
      id: 1,
      href: "/",
      activeIcon: RiHome2Fill,
      passiveIcon: RiHome2Line,
      size: 30,
    },
    {
        id: 2,
        href: '/favorites',
        activeIcon: MdOutlineFavorite,
        passiveIcon: MdOutlineFavoriteBorder,
        size: 30
    },
    {
        id: 3,
        href: '/messages',
        activeIcon: RiMessengerFill,
        passiveIcon: RiMessengerLine,
        size: 30
    },
   

    {
      id: 5,
      href: '/profile',
      activeIcon:RiUser3Fill,
      passiveIcon: RiUser3Line,
      size: 28,
    },
    
    {
        id: 6,
        activeIcon: FiLogOut,
        passiveIcon: FiLogOut,
        size: 27,
        additionalStyle: 'ml-4',
        onClick: async() => {
          await fetch('http://localhost:8080/api/signOut', {
            credentials: "include"
          })
          dispatch(logOut())
        
        }
    }
  ];
  return (
    <nav className="flex items-center gap-x-6">
      {navItems.map((navItem: NavItemProps) => (
        <NavItem key={navItem.id} navItem={navItem} />
      ))}
    </nav>
  );
}

function NavItem({ navItem }: { navItem: NavItemProps }) {
  if (navItem?.href  ) {
    return (
      <NavLink to={navItem.href} className={"text-black"}>
        {({ isActive }) => {
          return isActive ? (
            <navItem.activeIcon size={navItem.size} />
          ) : (
            <navItem.passiveIcon size={navItem.size} />
          );
        }}
      </NavLink>
    );
  }

  return (
    <button onClick={navItem.onClick} className={"text-black " + navItem.additionalStyle}>
        <navItem.activeIcon size={navItem.size}/>
    </button>
  )
}
