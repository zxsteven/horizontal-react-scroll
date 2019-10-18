import React from 'react';

import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";

import './App.css';

const movies = [
  "/breaking-bad.jpg",
  "/the-leftovers.jpg",
  "/game-of-thrones.jfif",
  "/true-detective.jpeg",
  "/walking-dead.jpg"
];

const App = () => {
  
  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));

  const clamp = (value: number, clampAt: number = 30) => {
    if (value > 0) {
      return value > clampAt ? clampAt : value;
    } else {
      return value < -clampAt ? -clampAt : value;
    }
  };

  const bind = useScroll(event => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`
    });
  });

  return (
    <>
      <div className="container" {...bind()}>
        {movies.map(src => (
          <animated.div
            key={src}
            className="card"
            style={{
              ...style,
              backgroundImage: `url(${src})`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default App;
