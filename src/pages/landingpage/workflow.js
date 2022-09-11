import { BsStars } from "react-icons/bs";

const Workflow = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-10">
      <p className="flex items-center text-xl">
        <span className="text-base text-amber-700">
          <BsStars />
        </span>
        Workflow
        <span className="text-base text-amber-700">
          <BsStars />
        </span>
      </p>
      <div className="flex flex-col xl:flex-row gap-5 items-center justify-end p-10">
        <div className="flex flex-col items-center justify-center sm:flex-row gap-5">
          <div className="flex h-32 flex-col gap-2 items-center justify-center">
            <p className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center ">
              1
            </p>
            <p className="w-48 text-center text-lg">
              Create account with QuickShare
            </p>
          </div>
          <img src="https://svgsilh.com/svg/310634.svg" alt="img" width={80} className="-rotate-90 sm:rotate-180"/>

          <div className="flex h-32 flex-col gap-2 items-center justify-center">
            <p className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center ">
              2
            </p>
            <p className="w-48 text-center text-lg">
              Create your first Project with quickshare
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5  items-center justify-center">
          <img src="https://svgsilh.com/svg/310634.svg" alt="img" width={80} className="-rotate-90 sm:rotate-180 flex sm:hidden xl:flex"/>
          <div className="flex h-32 flex-col gap-2 items-center justify-center">
            <p className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center ">
              3
            </p>
            <p className="w-48 text-center text-lg">
              Attach files and add your password
            </p>
          </div>

          <img src="https://svgsilh.com/svg/310634.svg" alt="img" width={80} className="-rotate-90 sm:rotate-180"/>
          <div className="flex h-32 flex-col gap-2 items-center justify-center mt-5">
            <p className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center ">
              4
            </p>
            <p className="w-48 text-center text-lg">
              Share the link with password to your members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
