import { React } from "react";
import Wrapper from "../Components/Wrapper";

export default function Welcome() {
  const myStyle = {
    textAlign: "center",
    width: "60%",
    backgroundColor: "#f1e8b8",
    borderRadius: "10px",
    boxShadow: "10px 6px 6px 1px rgb(106, 107, 14)",
    padding: "10px",
  };
  return (
    <Wrapper>
      <div style={myStyle}>
        <h2>Welcome to Page</h2>
        <p>You logged to this site properly</p>
      </div>
    </Wrapper>
  );
}
