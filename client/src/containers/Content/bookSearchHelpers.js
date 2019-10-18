import moment from "moment";

export const handleBookSearch = (values, history) => {
  const { title, author } = values;
  let url = `/content/add/book-search?title=${title}`;

  // Add author to url if any value was entered
  if (author) {
    url = url + `&author=${author}`;
  }
  // Go to search results page
  history.push(url);
};

export const formatDate = date => {
  return moment(date, "YYYY-MM-DD").format("MMM D, YYYY");
};
