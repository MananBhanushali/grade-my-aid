import React, { useState, useContext, useEffect } from "react";
import "./Sass/App.scss";
import SearchDropdown from "./SearchDropdown";
import AidInput from "./AidInput";
import { UniversityContext } from "./UniversityContext";
import { FormContext } from "./FormContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const universities = useContext(UniversityContext);
  const { locate, aid, dropdown } = useContext(FormContext);
  const [location, setLocation] = locate;
  const [aidValue] = aid;
  const [search] = dropdown;
  const [clickable, setClickable] = useState(true);

  const handleRadioClick = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    if (location === "" || aidValue === "" || search === "") {
      setClickable(false);
      e.preventDefault();
    } else {
      setClickable(true);
    }

    if (!universities.find((university) => university.INSTNM === search)) {
      setClickable(false);
      e.preventDefault();
    } else {
      setClickable(true);
    }
  };

  const containerVariants = {
    hidden: {
      x: "-115w",
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        when: "beforeChildren",
      },
    },
    exit: {
      x: "-115vw",
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <motion.div
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="home-main">
        <div className="headline-container">
          <motion.div
            className="circle1"
            initial={{ x: "-100vw", y: "-100vh", opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 1,
              type: "spring",
            }}
          ></motion.div>
          <motion.h1
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
            }}
          >
            Grade your financial aid package
          </motion.h1>
        </div>
        <div>
          <motion.div
            className="step1-container"
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
            }}
          >
            <h3>Step 1:</h3>
            <p>Choose a school</p>
            <SearchDropdown />
            <div className="state-select">
              <label htmlFor="inState">In-state</label>
              <input
                type="radio"
                id="inState"
                name="schoolState"
                className="state-radio"
                value="inState"
                onChange={handleRadioClick}
              />
              <span className="radio-control-in"></span>
              <label htmlFor="outState">Out-of-state</label>
              <input
                type="radio"
                id="outState"
                name="schoolState"
                className="state-radio"
                value="outState"
                onChange={handleRadioClick}
              />
              <span className="radio-control-out"></span>
            </div>
          </motion.div>
          <motion.div
            className="step2-container"
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              type: "spring",
            }}
          >
            <h3>Step 2:</h3>
            <p>Amount of yearly aid</p>
            <AidInput />
          </motion.div>
          <motion.div
            className="step3-container"
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
              type: "spring",
            }}
          >
            <h3>Step 3:</h3>
            <Link to="/result">
              <motion.button
                type="submit"
                className="gradient-btn"
                onClick={handleSubmit}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                GET YOUR RATING
              </motion.button>
            </Link>
            <AnimatePresence>
              {!clickable && (
                <motion.div
                  className="error"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                  }}
                >
                  There was an input error
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <footer className="home-footer">
        <motion.div
          className="circle2"
          initial={{ x: "100vw", y: "100vh", opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            type: "spring",
          }}
        ></motion.div>
        <a
          href="https://collegescorecard.ed.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source of Data
        </a>
        <a
          href="https://github.com/GameDog9988/check-my-aid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </footer>
    </motion.div>
  );
}

export default Home;
