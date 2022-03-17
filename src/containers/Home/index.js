import React from "react";
import { useHomeHook } from "./homeHook";
import ImagesContainer from "../../components/Home";
import Navbar from "../../components/NavBar";
function Home() {
  const { query, loading, error, photos, lastImageElementRef, handleSearch } =
    useHomeHook();
  return (
    <div className="App">
      <Navbar value={query} onChangeHandler={handleSearch} placeholder="Search.."/>
      <div className="imageContainer">
        <ImagesContainer
          images={photos}
          lastImageElementRef={lastImageElementRef}
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </div>
  );
}

export default Home;
