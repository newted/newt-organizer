import React from 'react'
import styles from './ProgramCard.module.css'

const ProgramCard = ({ name, shortname, institution }) => (
  <div className={ styles.card }>
    <div>
      <div className={ styles.title }>
        { name }
      </div>
      <div className={ styles.subtitle }>
        { institution }
      </div>
    </div>
  </div>
)

export default ProgramCard
