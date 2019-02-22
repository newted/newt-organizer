import React from 'react'
// Styling
import styles from './Timeline.module.css'

const Timeline = () => (
  <div className={ styles.container }>
    <div className={ styles.agendaContainer }>
      <h3 className={ styles.header }>Your Upcoming Week</h3>
      <div className={ styles.timeline }>
      </div>
    </div>
    <div className={ styles.prevWeekContainer }>
      <h3 className={ styles.header }>Previous Week</h3>
      <div className={ styles.prevWeek }>
      </div>
    </div>
  </div>
)

export default Timeline
