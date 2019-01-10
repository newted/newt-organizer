import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import sidebarFields from './sidebarFields'
import styles from './Sidebar.module.css'

class Sidebar extends Component {
  // Render sidebar links based on fields provided
  renderNavlinks() {
    return sidebarFields.map(({ name, route, icon }) => (
      <li className={ styles.navlink } key={ name }>
        <NavLink to={ route } activeClassName={ styles.activeNav }>
          <div className={ styles.navlinkRow }>
            { icon }
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
