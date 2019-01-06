import React from 'react'
import { Link } from 'react-router-dom'
// Styling
import styles from './ProgramCard.module.css'
import { UniversityIcon } from '../../utils/icons'

const ProgramCard = ({ id, name, shortname, institution }) => (
  <Link
    to={{ pathname: `/programs/${id}` }}
    className={ styles.card }
  >
    <div className={ styles.cardBody }>
      <div className={ styles.icon }>
        { UniversityIcon }
      </div>
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
