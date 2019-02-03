import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { IoIosSchool } from 'react-icons/io'
import { FiBook } from 'react-icons/fi'
import { FaPencilAlt } from 'react-icons/fa'
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
  },
  {
    name: 'Courses',
    route: '/courses',
    icon: <FiBook size={ 20 } className={ styles.icon } />
  },
  {
    name: 'Assignments',
    route: '/assignments',
    icon: <FaPencilAlt size={ 20 } className={ styles.icon } />
  }
]
