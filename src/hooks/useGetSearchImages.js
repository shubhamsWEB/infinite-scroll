/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
export default function useGetSearchImages(
  query,
  pageNumber,
  photos,
  setPhotos,
  error,
  setError,
  searchQuery,
  setSearchQuery
) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setPhotos([]);
  }, [query, setPhotos]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&",
      params: {
        api_key: process.env.REACT_APP_FLICKR_KEY,
        text: query,
        format: "json",
        page: pageNumber,
        extras: "url_m",
        nojsoncallback: 1,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((rsp) => {
        if (rsp.data.photos) {
          setPhotos((prevPhotos) => {
            return [...new Set([...prevPhotos, ...rsp.data.photos.photo])];
          });
          setSearchQuery([...new Set([...searchQuery, query])]);
          setHasMore(rsp.data.photos.photo.length > 0);
        }
        setLoading(false);
      })
      .catch((e) => {
        // IF AXIOS CANCILATTION ERROR return
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, photos, hasMore };
}
