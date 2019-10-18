import React, { useState, useEffect } from "react";
import _ from "lodash";
import qs from "qs";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import Loader from "../../components/Loader";
import BookContentForm from "./BookContentForm";
import BookCard from "./BookCard";
import BookModal from "./BookModal";
// API
import { getBookInfo } from "../../actions/userContent";
// Helpers
import { handleBookSearch } from "./bookSearchHelpers";
// Styling
import styles from "./BookSearchResults.module.css";

const BookSearchResults = ({ location, history }) => {
  const [searchParams, setSearchParams] = useState({ title: "", author: "" });
  const [searchResults, setSearchResults] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);

  const handleShowBookModal = () => setShowBookModal(true);
  const handleCloseBookModal = () => setShowBookModal(false);

  const handleGoToBookSearchResults = values => {
    handleBookSearch(values, history);
  };

  const handleBookSelect = bookInfo => {
    setCurrentBook(bookInfo);
    handleShowBookModal();
  };

  useEffect(() => {
    let params = { title: "", author: "" };
    // Get search parameters from url
    const urlParams = qs.parse(location.search.slice(1));
    // Spread into initialized params object so all fields are available to
    // pass as initial values to search form
    params = { ...params, ...urlParams };
    const getResults = async (title, author) => {
      const results = await getBookInfo(title, author);
      setSearchParams(params);
      setSearchResults(results.items);
    };

    // Make request to get book info
    if (!_.isEmpty(params)) {
      const { title, author } = urlParams;
      getResults(title, author);
    }
  }, [location.search]);

  if (_.isEmpty(searchResults)) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <ContentContainer className={styles.searchContainer}>
        <BookContentForm
          initialValues={searchParams}
          onSubmit={handleGoToBookSearchResults}
          direction="horizontal"
        />
      </ContentContainer>
      <HeaderContainer>
        <h4>Search Results</h4>
      </HeaderContainer>
      <ContentContainer className={styles.cardContainer}>
        {!_.isEmpty(searchResults) &&
          searchResults.map(book => (
            <BookCard
              bookInfo={book}
              onClick={handleBookSelect}
              key={book.id}
            />
          ))}
      </ContentContainer>
      {!_.isEmpty(currentBook) && (
        <BookModal
          show={showBookModal}
          onHide={handleCloseBookModal}
          onSubmit={() => alert("Adding book to course..")}
          bookInfo={currentBook}
        />
      )}
    </MainContainer>
  );
};

export default BookSearchResults;
