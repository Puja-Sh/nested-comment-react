import React from "react";

const Home = (props) => {
  let userName;
  const submitHandler = (e) => {
    e.preventDefault();
    userName = e.target[0].value;
    console.log(userName);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="your name" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Home;
