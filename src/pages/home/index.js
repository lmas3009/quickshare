import React, { useEffect } from "react";
import Header from "./header";
import { Auth } from "aws-amplify";
import history from "../../utils/history";


const Home = () => {
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((res) => {})
      .catch((err) => {
        history.push("/");
        history.go();
      });
  });

  return (
    <div>
      <Header />
      <div className="w-full flex items-center justify-center poppins">
        <div className="bg-white pl-4 pr-4 h-full w-full m-5 sm:m-0 sm:w-[30rem] text-black shadow-md shadow-slate-500 rounded-md mt-10 flex gap-3 flex-col items-center justify-center p-5 text-center">
          <p>Welcome to QuickShare</p>
          <p>You have total 10 project running live</p>
          <p>to create a new project 👇</p>
          <a href="/newproject" className="bg-black text-white p-2 pl-4 pr-4 rounded cursor-pointer" >
            Create Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
