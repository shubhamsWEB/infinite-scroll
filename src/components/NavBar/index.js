import React from "react";
import Input from "../../components/shared/Input";
function Navbar({ value, onChangeHandler, placeholder }) {
  return (
    <div className="text-center bg-black p-6 h-40 z-0">
      <div className="text-4xl mb-3 text-white">Search Photos</div>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
}

export default Navbar;
