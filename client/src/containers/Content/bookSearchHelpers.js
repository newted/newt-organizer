import moment from "moment";

export const handleBookSearch = (values, courseId, history) => {
  const { title, author } = values;
  let url = `/content/add/book-search?title=${title}`;

  // Add author to url if any value was entered
  if (author) {
    url = url + `&author=${author}`;
  }
  // Go to search results page
  history.push(url, { courseId });
};

export const formatDate = date => {
  return moment(date, "YYYY-MM-DD").format("MMM D, YYYY");
};

export const convertBookToUserContent = (bookInfo, courseId) => {
  const formattedPublishDate = moment(
    bookInfo.volumeInfo.publishedDate,
    "YYYY-MM-DD"
  ).toDate();

  return {
    name: bookInfo.volumeInfo.title,
    description: bookInfo.volumeInfo.description,
    courseId: courseId,
    sourceInfo: {
      name: "book"
    },
    bookInfo: {
      bookId: bookInfo.id,
      title: bookInfo.volumeInfo.title,
      subtitle: bookInfo.volumeInfo.subtitle,
      description: bookInfo.volumeInfo.description,
      authors: bookInfo.volumeInfo.authors,
      thumbnails: {
        standard: bookInfo.volumeInfo.imageLinks.thumbnail,
        small: bookInfo.volumeInfo.imageLinks.smallThumbnail
      },
      industryIdentifiers: {
        ISBN_10: bookInfo.volumeInfo.industryIdentifiers[1].identifier,
        ISBN_13: bookInfo.volumeInfo.industryIdentifiers[0].identifier
      },
      pageCount: bookInfo.volumeInfo.pageCount,
      publisher: bookInfo.volumeInfo.publisher,
      datePublished: formattedPublishDate
    }
  };
};
