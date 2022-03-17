/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback, useRef, useEffect } from "react";
import useGetImages from "../../hooks/useGetSearchImages";
import axios from "axios";
export const useHomeHook = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const getImages = useCallback(() => {
    return useGetImages(query, pageNumber, photos, setPhotos, error, setError,loading,hasMore,setLoading,setHasMore);
  }, [query, pageNumber, photos, error]);
  // Calling search function only if search query is not empty
  // const { loading, hasMore } = query !=="" ? getImages() : {loading:false, hasMore:false};
  getImages();
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
  useEffect(() => {
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
  }, []);
  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  return {
    lastImageElementRef,
    handleSearch,
    loading,
    error,
    photos,
    query,
  };
};
