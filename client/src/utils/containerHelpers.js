import moment from "moment";

// Sort two objects first by status (incomplete, in progress, complete), and
// then by due date. (Used in Assignment Table)
// Essentially, the `Show Completed` button should render the completed
// items at the bottom of the table, but the incomplete and in progress
// items should be ordered by descending order of due date.
export const statusDueDateSort = array => {
  return array.sort((a, b) => {
    const aDate = new Date(a.dateDue);
    const bDate = new Date(b.dateDue);

    switch (true) {
      case a.isComplete && b.isComplete:
        return bDate - aDate;
      // If both a and b are completed, then everytime a is completed, make
      // the index higher, and everytime b is completed, make `a's` index higher.
      // That is, if a is completed or b is completed, move `a` further down the
      // array.
      case a.isComplete:
        return 1;
      case b.isComplete:
        return -1;
      // Otherwise, (for in progress and/or completed) sort by date
      default:
        return aDate - bDate;
    }
  });
};

// Initialize the array of objects that is used to organize the information
// that goes into the Previous Weeks section in the Dashboard. There's 3
// objects in the returned array, in descending order of previous 3 weeks. Each
// object has a start and end date of that given week, as well as
// the assignments that were done (or supposed to be done) that week.
export const initializePrevAssignments = () => {
  const prevWeeks = [
    { startDate: "", endDate: "", assignments: [] },
    { startDate: "", endDate: "", assignments: [] },
    { startDate: "", endDate: "", assignments: [] }
  ];

  const currentWeek = moment().week();

  // Initialize start and end date for each week
  prevWeeks.forEach((week, index) => {
    prevWeeks[index].startDate = moment()
      .day(0)
      .week(currentWeek - (index + 1))
      .format("MMM Do");

    prevWeeks[index].endDate = moment()
      .day(6)
      .week(currentWeek - (index + 1))
      .format("MMM Do");
  });

  return prevWeeks;
};

// Reduces the text to a smaller size, while still making sure that it ends with
// a full word.
export function shortenText(text, maxCharacters) {
  // If there's no text, return nothing.
  if (!text) return;

  // If the text is smaller than the maximum size, return the text
  if (text.length < maxCharacters) {
    return text;
  }

  const punctuation = [" ", ".", ",", ";", "?", "/", "-"];

  // If the next character after the max character is part of punctuation, then
  // that means the word ends on the last character. If it does not, keep
  // reducing the character count until you hit a blank space/punctuation, which
  // marks the end of the word.
  if (punctuation.includes(text[maxCharacters + 1])) {
    return text.substr(0, maxCharacters) + "...";
  } else {
    let characterCount = maxCharacters;
    while (!punctuation.includes(text[characterCount])) {
      characterCount -= 1;
    }

    return text.substr(0, characterCount) + "...";
  }
}
