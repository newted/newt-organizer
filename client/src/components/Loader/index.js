import React from 'react'
// Styling
import styles from './Loader.module.css'
import 'loaders.css/loaders.min.css'

// Component for a main page "ball-pulse-sync" loader (from `loaders.css`) with
// default color of Newt Blue
const Loader = ({ color = "#38ceff" }) => (
  <div className={styles.container}>
    <div className="loader">
      <div className="loader-inner ball-pulse-sync">
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
      </div>
    </div>
  </div>
)

export default Loader
