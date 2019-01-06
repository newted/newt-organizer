import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProgramCard.module.css'

const ProgramCard = ({ id, name, shortname, institution }) => (
  <Link
    to={{ pathname: `/programs/${id}` }}
    className={ styles.card }
  >
    <div>
      <div className={ styles.title }>
        { name }
      </div>
      <div className={ styles.subtitle }>
        { institution }
      </div>
    </div>
  </Link>
)

export default ProgramCard
