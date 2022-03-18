import React, { useEffect } from "react";
import Input from "../../components/shared/Input";
function Navbar({
  value,
  onChangeHandler,
  placeholder,
  searchQuerys,
  setSearchQuery,
}) {
  const [isNavScrolled, setNavScrolled] = React.useState(false);
  const changeNavbarStyles = () => {
    if (window.scrollY >= 79) {
      setNavScrolled(true);
    } else {
      setNavScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavbarStyles);
    // return window.removeEventListener("scroll");
  }, []);
  return (
    <div
      className={`text-center bg-black transition-all ease-in-out duration-1000 ${
        isNavScrolled ? "opacity-90" : ""
      } p-6 h-${isNavScrolled ? 20 : 40} z-50`}
    >
      <div
        className={`text-4xl mb-3 text-white transition duration-700 ease-in-out animate-fade  ${
          isNavScrolled ? "hidden" : ""
        }`}
      >
        Search Photos
      </div>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeHandler={onChangeHandler}
        searchQuerys={searchQuerys}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}

export default Navbar;
