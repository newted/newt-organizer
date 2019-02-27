import React from 'react'
import { Link } from 'react-router-dom'
// Styling
import styles from './TimelineCard.module.css'
import { FiFileText, FiCheckSquare } from 'react-icons/fi'

const TimelineCard = (
  { title, course, details, programId, courseId, completed, inProgress }
) => (
  <div className={ styles.card }>
    <div className={ styles.cardVisual }>
      <FiFileText size={ 30 } color='#555' />
    </div>
    <div className={ styles.cardBody }>
      <div className={ styles.cardText }>
        <div className={ styles.headers }>
          <h4 className={ styles.title }>{ title }</h4>
          <div style={{ color: '#bbb', marginRight: '.5rem' }}>&mdash;</div>
          <Link to={{ pathname: `/programs/${programId}/courses/${courseId}`}}>
            <h4 className={ styles.subtitle }>{ course }</h4>
          </Link>
        </div>
        <div className={ styles.details }>{ details }</div>
      </div>
      <div className={ styles.cardStatus }>
        <FiCheckSquare size={ 25 } className={ styles.check } />
      </div>
    </div>
  </div>
)

export default TimelineCard
