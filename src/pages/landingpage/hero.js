import { BsStars } from "react-icons/bs";

const Hero = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-3 poppins">
      <p className="poppins flex items-center text-xl">
        <span className="text-base text-amber-700">
          <BsStars />
        </span>
        QuickShare
        <span className="text-base text-amber-700">
          <BsStars />
        </span>
      </p>
      <p className="text-xl sm:text-2xl text-center p-5">
        A platform to share your files with password encrypted
      </p>
      <div className="bg-black text-white p-2 pl-5 pr-5 rounded cursor-pointer">
        <p>Share your first file</p>
      </div>
    </div>
  );
};

export default Hero;
