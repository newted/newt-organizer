import React, { useState, useEffect } from "react";
import _ from "lodash";
import qs from "qs";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import BookCard from "./BookCard";
// API
import { getBookInfo } from "../../actions/userContent";
// Styling
import styles from "./BookSearchResults.module.css";

const BookSearchResults = ({ location }) => {
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const params = qs.parse(location.search.slice(1));
    const getResults = async (title, author) => {
      const results = await getBookInfo(title, author);
      setSearchResults(results.items);
    };

    // Make request to get book info
    if (!_.isEmpty(params)) {
      const { title, author } = params;
      getResults(title, author);
    }
  }, [location.search]);
  console.log(searchResults);

  return (
    <MainContainer>
      <HeaderContainer>
        <h4>Search Results</h4>
      </HeaderContainer>
      <ContentContainer className={styles.cardContainer}>
        {!_.isEmpty(searchResults) &&
          searchResults.map(book => <BookCard bookInfo={book} key={book.id} />)}
      </ContentContainer>
    </MainContainer>
  );
};

export default BookSearchResults;
