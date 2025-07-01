import clsx from "clsx"
import { NavLink } from "react-router"

const Menu = () => {
  return (
    <nav className={clsx("fixed bottom-8 inset-x-1/12 px-1", "flex justify-around")}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/promote">Promote</NavLink>
      <NavLink to="/claim">Claim</NavLink>
    </nav>
  )
}

export default Menu
