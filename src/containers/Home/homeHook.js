/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useRef, useEffect } from "react";
import useGetImages from "../../hooks/useGetSearchImages";
import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";
export const useHomeHook = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useLocalStorage("searchQuery", []);
  const [pageNumber, setPageNumber] = useState(1);

  // fetching images
  const getImages = useCallback(() => {
    return useGetImages(
      query,
      pageNumber,
      photos,
      setPhotos,
      error,
      setError,
      searchQuery,
      setSearchQuery
    );
  }, [query, pageNumber, photos, error, searchQuery, setSearchQuery]);
  const { loading, hasMore } = getImages();

  // Attaching the last image element to the scroll event
  const observer = useRef();
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  // Getting recent images
  useEffect(() => {
    if(query ==="") {
    axios({
      method: "GET",
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&",
      format: "json",
      params: {
        api_key: process.env.REACT_APP_FLICKR_KEY,
        format: "json",
        extras: "url_m",
        nojsoncallback: 1,
      },
    })
      .then((rsp) => {
        if (rsp.data.photos) {
          setPhotos(rsp.data.photos.photo);
        }
      })
      .catch((e) => {
        setError(true);
      });
    }
  }, [query]);

  // function to handle search queries
  function handleSearch(text) {
    setQuery(text);
    setPageNumber(1);
  }
  return {
    lastImageElementRef,
    handleSearch,
    loading,
    error,
    photos,
    query,
    searchQuery,
    setSearchQuery,
  };
};
