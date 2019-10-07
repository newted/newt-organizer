import React from "react";

const BookSearchResults = ({ books }) => (
  <div style={{ marginTop: "2rem " }}>
    <ul>
      {books.map(book => (
        <li>{book.volumeInfo.title}</li>
      ))}
    </ul>
  </div>
);

export default BookSearchResults;
