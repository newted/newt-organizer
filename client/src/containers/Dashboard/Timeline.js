import React from 'react'
// Components
import TimelineCard from './TimelineCard'
// Styling
import styles from './Timeline.module.css'

const Timeline = () => (
  <div className={ styles.container }>
    <div className={ styles.agendaContainer }>
      <h3 className={ styles.header }>Your Upcoming Week</h3>
      <div className={ styles.timeline }>
        <h4 className={ styles.date }>22 Feb 2019</h4>
        <TimelineCard
          title='JSX Assignment 1'
          course='React Nanodegree'
          details='Learn about JSX, a JavaScript syntax extension.'
        />
        <TimelineCard
          title='The Mongols'
          course='Crash Course History'
          details='Learn about JSX, a JavaScript syntax extension.'
        />
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
