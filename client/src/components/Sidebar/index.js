import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const FIELDS = [
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Programs', route: '/programs' }
]

class Sidebar extends Component {
  // Render sidebar links based on fields provided
  renderNavlinks() {
    return FIELDS.map(({ name, route }) => (
      <li className={ styles.navlink } key={ name }>
        <NavLink to={ route } activeClassName={ styles.activeNav }>
          <div className={ styles.navlinkRow }>
            <div>{ name }</div>
          </div>
        </NavLink>
      </li>
    ))
  }

  render() {
    return (
      <aside className={ styles.sidebar }>
        <div className={ styles.sidebarNavlinks }>
          <ul>
            { this.renderNavlinks() }
          </ul>
        </div>
      </aside>
    )
  }
}

export default Sidebar
