import React, { useState, useEffect } from "react";
import _ from "lodash";
import qs from "qs";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import BookContentForm from "./BookContentForm";
import BookCard from "./BookCard";
// API
import { getBookInfo } from "../../actions/userContent";
// Styling
import styles from "./BookSearchResults.module.css";

const BookSearchResults = ({ location }) => {
  const [searchParams, setSearchParams] = useState({ title: "", author: "" });
  const [searchResults, setSearchResults] = useState(null);

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

  return (
    <MainContainer>
      <ContentContainer className={styles.searchContainer}>
        <BookContentForm initialValues={searchParams} direction="horizontal" />
      </ContentContainer>
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
