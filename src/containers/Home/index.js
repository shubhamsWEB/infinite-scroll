import React from "react";
import { useHomeHook } from "./homeHook";
import ImagesContainer from "../../components/Home";
import Navbar from "../../components/NavBar";
function Home() {
  const {
    query,
    loading,
    error,
    photos,
    lastImageElementRef,
    handleSearch,
    searchQuery,
    setSearchQuery,
  } = useHomeHook();
  return (
    <div className="App">
      <div className="navbar sticky top-0 z-50">
        <Navbar
          value={query}
          onChangeHandler={handleSearch}
          placeholder="Search.."
          searchQuerys={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="imageContainer">
        <ImagesContainer
          images={photos}
          lastImageElementRef={lastImageElementRef}
        />
      </div>
      {loading && (
        <>
          <div className="flex items-center justify-center space-x-2 p-10">
            <div className="flex items-center justify-center ">
              <div>
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="w-20 h-20 border-4 border-blue-500 border-solid rounded-full animate-spin"
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
      {error && <div>Error</div>}
    </div>
  );
}

export default Home;
