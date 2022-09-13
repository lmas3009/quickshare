import React from "react";
import {FcGoogle} from "react-icons/fc"
import {Auth} from "aws-amplify"

const Authenticate = () => {

  return (
    <div className="w-full h-[100vh] flex flex-col-reverse sm:flex-row items-center justify-center poppins">
      <div className="bg-white text-black w-full sm:w-[50%] h-full sm:h-[100vh] flex flex-col gap-3 items-center justify-center poppins">
        <p className="text-2xl sarpanch">Welcome to QuickShare</p>
        <div className="p-2 border-2 border-black rounded pl-4 pr-4 flex gap-3 items-center mt-10 cursor-pointer" onClick={()=>{
          Auth.federatedSignIn({provider:"Google"})
        }}>
          <span className="text-xl"><FcGoogle/></span>
          <p>Continue with Google</p>
        </div>
      </div>
      <div className="bg-[#f284706e] w-[50%] h-[100vh] items-center justify-center hidden sm:flex">
        <p className="text-xl">QuickShare</p>
      </div>
    </div>
  );
};

export default Authenticate;