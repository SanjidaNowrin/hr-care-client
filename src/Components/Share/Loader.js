import React from "react";
import { Puff } from "react-loader-spinner";
const Loaders = () => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height: "100vh"}}>
    <Puff
      color="#01578A"
      height={100}
      width={100}
      timeout={4000}
    />
  </div>
  );
};

export default Loaders;