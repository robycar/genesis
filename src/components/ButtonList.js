import React, { useState } from "react";
import "../styles/App.css";

const ButtonList = () => {
  const [appState, changeState] = useState({
    activeObject: null,
    objects: [
      { id: 0, name: "Test Running" },
      { id: 1, name: "Test Running" },
      { id: 2, name: "Test Schedulati" },
      { id: 3, name: "Test Conclusi" },
    ],
  });

  function toggleActiveStyles(index) {
    if (appState.objects[index] === appState.activeObject) {
      return "box active";
    } else {
      return "box inactive";
    }
  }
  return (
    <div className="App">
      {appState.objects.map((elements, index) => (
        <div
          key={index}
          className={toggleActiveStyles(index)}
          onClick={() => {
            // toggleActive(index);
          }}
        ></div>
      ))}
    </div>
  );
};

export default ButtonList;
