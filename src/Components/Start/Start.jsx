import React, { useRef } from "react";

const Start = (props) => {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.value && props.setUser(inputRef.current.value);
  };
  return (
    <div className="start">
      <input type="text" placeholder="enter you name" className="startInput"  ref={inputRef} />
      <button className="startButton" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
};

export default Start;
