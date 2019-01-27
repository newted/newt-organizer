import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import moment from 'moment'
// Styling
import styles from './Table.module.css'
import { FiMoreVertical } from 'react-icons/fi'

class Table extends Component {
  showHideDropdown(objectId) {
    return this.props.dropdownVisible[objectId]
      ? [styles.menu, styles.displayBlock].join(' ')
      : [styles.menu, styles.displayNone].join(' ')
  }

  renderTableHeader() {
    const { fieldsObj } = this.props

    return _.map(
      Object.keys(fieldsObj),
      label => <th key={ label }>{ label }</th>
    )
  }

  renderTableBody() {
    const { data, fieldsObj } = this.props

    return _.map(data, object => {
      return (
        // A table row for each object (assignment, etc.)
        <tr key={ object._id }>
          {
            _.map(Object.keys(fieldsObj), label => {
              // Getting the object key so that info can be accessed
              const name = fieldsObj[label]

              // A table data field for each table header
              return (
                <td key={ object._id + label }>
                  { name === 'dateDue'
                    ? object[name] && moment(object[name]).format('ddd, MMM Do')
                    : object[name]
                  }
                </td>
              )
            })
          }
          {/* Options icon */}
          <td className={ styles.options }>
            <div
              className={ styles.dropdown }
              onClick={ (event) =>
                this.props.handleOpenDropdown(object._id, event)
              }
            >
              <FiMoreVertical />
              <div
                className={ this.showHideDropdown(object._id) }
                ref={ (element) => { this.props.setDropdownMenu(element) } }
              >
                <div
                  className={ styles.item }
                  onClick={ () => console.log(object.name) }
                >
                  Delete
                </div>
              </div>
            </div>
          </td>
        </tr>
      )
    })
  }

  render() {
    const { data, name } = this.props

    return (
      <div className={ styles.tableContainer }>
        { data.length === 0
          ? <div>{ `There are no ${name}.` }</div>
          : <table>
              <thead>
                <tr>
                  { this.renderTableHeader() }
                </tr>
              </thead>
              <tbody>
                { this.renderTableBody() }
              </tbody>
            </table>
        }
      </div>
    )
  }
}

/* This function turns the fields array passed in as props into an object
   of type [label]: [name]
   The label is used to render the table headers
   The name is used as the key to access that particular piece of information
   from the data object also passed as a prop */
function fieldsArrayToObject(fieldsArray) {
  const fieldsObj = {}

  fieldsArray.map(({ label, name }) => {
    return fieldsObj[label] = name
  })

  return fieldsObj
}

function mapStateToProps(state, { data, fields, name }) {
  const fieldsObj = fieldsArrayToObject(fields)

  return {
    data,
    fieldsObj,
    name
  }
}

export default connect(mapStateToProps)(Table)