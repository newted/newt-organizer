import React, { Component } from 'react'
import styles from './Table.module.css'

class Table extends Component {
  render() {
    return (
      <div className={ styles.tableContainer }>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Details</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Assignment 1</td>
              <td>Assignment 1 details</td>
              <td>29 Jan, 2018</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table
