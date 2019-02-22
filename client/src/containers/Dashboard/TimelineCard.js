import React from 'react'
// Styling
import styles from './TimelineCard.module.css'
import { FiFileText } from 'react-icons/fi'

const TimelineCard = ({ title, course, details }) => (
  <div className={ styles.card }>
    <div className={ styles.cardVisual }>
      <FiFileText size={ 30 } color='#555' />
    </div>
    <div className={ styles.cardBody }>
      <div className={ styles.headers }>
        <h4 className={ styles.title }>{ title }</h4>
        <div style={{ color: '#bbb', marginRight: '.5rem' }}>&mdash;</div>
        <h4 className={ styles.subtitle }>{ course }</h4>
      </div>
      <div className={ styles.details }>{ details }</div>
    </div>
  </div>
)

export default TimelineCard
