import React from 'react'
// Styling
import styles from './PrevWeekCard.module.css'

const PrevWeekCard = ({ numCompleted, percentCompleted, total }) => (
  <div className={ styles.card }>
    <div className={ styles.cardVisual }>
      <div className={ styles.circle }>
        { percentCompleted }
      </div>
    </div>
    <div className={ styles.cardBody }>
      { `${numCompleted} / ${total} completed`}
    </div>
  </div>
)

export default PrevWeekCard
