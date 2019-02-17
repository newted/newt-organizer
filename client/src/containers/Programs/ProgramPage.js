import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
// API
import { deleteProgram }  from '../../actions/programs'
import { fetchCourses } from '../../actions/courses'
// Components
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ProgramCourseList from '../Courses/ProgramCourseList'
// Styling
import styles from './ProgramPage.module.css'

class ProgramPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    program: PropTypes.shape({
      courses: PropTypes.array,
      dateCreated: PropTypes.string,
      institution: PropTypes.string,
      name: PropTypes.string,
      shortname: PropTypes.string,
      _id: PropTypes.string,
      _user: PropTypes.string
    }),
    deleteProgram: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  }

  state = {
    showModal: false
  }

  componentDidMount() {
    this.props.fetchCourses(this.props.programId)
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  renderContent() {
    const { program, history, deleteProgram } = this.props

    return (
      <div className={ styles.contentContainer }>
        <div className={ styles.headerContainer }>
          <div className={ styles.headings }>
            <h2 className={ styles.header }>
              { this.props.program.name }
            </h2>
            <h2 className={ styles.institution }>
              { this.props.program.institution }
            </h2>
          </div>
          <div>
            <Link to={{ pathname: `/programs/${this.props.program._id}/edit` }}>
              <Button additionalClass={ styles.editBtn }>
                Edit
              </Button>
            </Link>
            <Button
              additionalClass={ styles.deleteBtn }
              onClick={ this.openModal }
            >
              Delete
            </Button>
            <Modal
              showModal={ this.state.showModal }
              handleClose={ this.closeModal }
            >
              <Modal.Body>
                Are you sure you want to delete this program?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type='button'
                  additionalClass={ styles.deleteBtn }
                  onClick={ () => deleteProgram(program._id, history) }
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <ProgramCourseList programId={ program._id }/>
      </div>
    )
  }

  render() {
    // Redirect to Landing page if not authenticated
    if (!this.props.auth.exists) {
      return <Redirect to='/' />
    }

    if (!this.props.program) {
      return <LoadingBar />
    }

    return (
      <div className={ styles.mainContainer }>
        { this.renderContent() }
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }, props) {
  const { programId } = props.match.params
  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0]

  return {
    auth,
    program,
    programId
  }
}

const mapDispatchToProps = {
  deleteProgram,
  fetchCourses
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramPage)
