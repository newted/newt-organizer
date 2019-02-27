import React from 'react'
import { Link } from 'react-router-dom'
// Styling
import styles from './TimelineCard.module.css'
import { FiFileText, FiCheckSquare } from 'react-icons/fi'

const TimelineCard = ({ assignment, completeAssignment }) => (
  <div className={ assignment.completed
    ? `${styles.card} ${styles.completedCard}`
    : styles.card
  }>
    <div className={ assignment.completed
      ? `${styles.cardVisual} ${styles.completedCardVisual}`
      : styles.cardVisual
    }>
      <FiFileText size={ 30 } color='#555' />
    </div>
    <div className={ styles.cardBody }>
      <div className={ styles.cardText }>
        <div className={ styles.headers }>
          <h4 className={ styles.title }>{ assignment.name }</h4>
          <div style={{ color: '#bbb', marginRight: '.5rem' }}>&mdash;</div>
          <Link to={{ pathname: `/programs/${assignment.programId}/courses/${assignment.courseId}`}}>
            <h4 className={ styles.subtitle }>{ assignment.courseName }</h4>
          </Link>
        </div>
        <div className={ styles.details }>{ assignment.details }</div>
      </div>
      <div className={ styles.cardStatus }>
        <div
          style={{ height: '25px' }}
          onClick={() => completeAssignment(assignment.courseId, assignment._id)}>
          <FiCheckSquare
            size={ 25 }
            className={ assignment.completed
              ? `${styles.check} ${styles.completedCheck}`
              : styles.check
            }
          />
        </div>
        { assignment.completed && (
            <div style={{ marginLeft: '.5rem' }}>Done!</div>
        )}
      </div>
    </div>
  </div>
)

export default TimelineCard
