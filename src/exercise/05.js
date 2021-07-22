// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import React, { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()
  const tiltRef = useRef();

  useEffect(() => {
    // This grabs DOM node's current ref prop.
    const tiltNode = tiltRef.current;

    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    // Return a function to clean up the event listeners when the component unmounts.
    // From the docs: "every effect may return a function that cleans up after it"
    // https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => tiltNode.vanillaTilt.destroy();
  }, []);

  // 🐨 add the `ref` prop to the `tilt-root` div here (this is the jam)
  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
