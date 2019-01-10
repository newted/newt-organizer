import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { IoIosSchool } from 'react-icons/io'
import styles from './Sidebar.module.css'

export default [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: <MdDashboard size={ 20 } className={ styles.icon } />
  },
  {
    name: 'Programs',
    route: '/programs',
    icon: <IoIosSchool size={ 20 } className={ styles.icon } />
  }
]
