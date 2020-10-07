import React, { useEffect, useState, useRef, useContext } from "react";
import "./Sass/App.scss";
import { UniversityContext } from "./UniversityContext";
import { FormContext } from "./FormContext";

function SearchDropdown() {
  const data = useContext(UniversityContext);
  const { dropdown } = React.useContext(FormContext);
  const [search, setSearch] = dropdown;
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);

  const filteredData = data.filter((university) => {
    return university.institution.toLowerCase().includes(search.toLowerCase());
  });

  const typeSearch = (e) => {
    setSearch(e.target.value);
  };

  const clickSearch = (school) => {
    setSearch(school);
    setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  return (
    <div className="dropdown" ref={wrapperRef}>
      <input
        className="search-bar"
        placeholder="Search for a school"
        type="text"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={typeSearch}
      />
      {display && (
        <div className="dropdown-schools">
          {filteredData.map((university, index) => (
            <div
              onClick={() => clickSearch(university.institution)}
              className="option"
              key={index}
              tabIndex="0"
              value={university}
            >
              <span>{university.institution}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchDropdown;
