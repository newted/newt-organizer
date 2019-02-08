// Sort two objects first by status (incomplete, in progress, complete), and
// then by due date. (Used in Assignment Table)
// Essentially, the `Show Completed` button should render the completed
// items at the bottom of the table, but the incomplete and in progress
// items should be ordered by descending order of due date.
export const statusDueDateSort = (array) => {
  return array.sort((a, b) => {
    const aDate = new Date(a.dateDue)
    const bDate = new Date(b.dateDue)

    switch (true) {
      case a.completed && b.completed:
        return aDate - bDate
      case a.completed && b.inProgress:
        return 1
      case a.completed && !b.completed:
        return 1
      case a.inProgress && b.completed:
        return -1
      case a.inProgress && b.inProgress:
        return aDate - bDate
      case a.inProgress & !b.completed:
        return aDate - bDate
      case !a.completed && b.completed:
        return -1
      case !a.completed && b.inProgress:
        return aDate - bDate
      case !a.completed && !b.completed:
        return aDate - bDate
      default:
        return 'Default'
    }
  })
}
