import React from "react";

const Lights = () => {
  return (
<>
  <ambientLight intensity={2} />

  <directionalLight
    position={[5,5,5]}
    intensity={2}
    color="#ffffff"
  />

  <pointLight
    position={[-5,2,-5]}
    intensity={2}
    color="#6366f1"
  />

  <pointLight
    position={[5,-2,3]}
    intensity={1.5}
    color="#22d3ee"
  />
</>
  );
};

export default Lights;