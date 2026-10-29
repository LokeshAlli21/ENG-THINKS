import { NavLink } from 'react-router-dom'

function Navbar({ navs }) {
  return (
    <nav>
      <ul>
        {navs.map((nav) => (
          <li key={nav.path}>
            <NavLink to={nav.path} end={nav.path === '/'}>
              {nav.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
