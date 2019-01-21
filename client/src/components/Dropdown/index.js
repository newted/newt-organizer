import React, { Component } from 'react'
import styles from './Dropdown.module.css'
import findByComponentType from '../../utils/findByComponentType'

const Menu = () => null
const Item = () => null

class Dropdown extends Component {
  showHideClassName() {
    return this.props.visible
      ? [styles.menu, styles.displayBlock].join(' ')
      : [styles.menu, styles.displayNone].join(' ')
  }

  renderDropdownItems(items) {
    return items.map(item => (
        <div
          className={ styles.item }
          onClick={ item.props.onClick }
          key={ item.props.children}>
            { item.props.children }
        </div>
      )
    )
  }

  renderDropdownMenu() {
    const { children } = this.props
    const menu = findByComponentType(children, Menu)

    if (!menu) {
      return null
    }

    return (
      <div
        className={ this.showHideClassName() }
        ref={ (element) => menu.ref(element) }
      >
        { this.renderDropdownItems(menu.props.children) }
      </div>
    )
  }

  render() {
    console.log(this.props.children[0])
    return (
      <div
        className={ styles.dropdown }
        onClick={ this.props.handleOpen }
      >
        { this.props.children[0] }
        { this.renderDropdownMenu() }
      </div>

    )
  }
}

Dropdown.Menu = Menu
Dropdown.Item = Item

export default Dropdown
