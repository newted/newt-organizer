export const assignmentInputFields =  [
  {
    label: 'Name',
    name: 'name',
    required: true
  },
  {
    label: 'Details',
    name: 'details',
    required: false
  },
  {
    label: 'Due Date',
    name: 'dateDue',
    required: true
  }
]

export const assignmentTableFields = {
  'Name': {
    name: 'name',
    width: '35%'
  },
  'Details': {
    name: 'details',
    width: '40%'
  },
  'Due Date': {
    name: 'dateDue',
    width: '20%'
  },
  'Status': {
    name: 'status',
    width: '5%'
  }
}

export const allAssignmentTableFields = {
  'Name': {
    name: 'name',
    width: '25%'
  },
  'Course Name': {
    name: 'courseName',
    width: '25%'
  },
  'Details': {
    name: 'details',
    width: '30%'
  },
  'Due Date': {
    name: 'dateDue',
    width: '15%'
  },
  'Status': {
    name: 'status',
    width: '5%'
  }
}
