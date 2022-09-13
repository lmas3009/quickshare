import React, { useEffect, useState } from "react";
import Header from "./header";
import { Auth, navItem } from "aws-amplify";
import history from "../../utils/history";
import { DataStore } from "@aws-amplify/datastore";
import { NewProject } from "../../models";
import { IoOpen } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const [data, setdata] = useState([]);
  const [uid, setuid] = useState("");

  function getRandomColor() {
    var letters = "BCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((res) => {
        setdata(res["username"]);
      })
      .catch((err) => {
        history.push("/");
        history.go();
      });

    const fetchData = async () => {
      const _data = await DataStore.query(NewProject, (c) =>
        c.userid("eq", uid)
      );
      setdata(_data);
    };
    fetchData();
  }, [uid]);

  const DeleteProject = async (pid) => {
    console.log(pid);
    const modelToDelete = await DataStore.query(NewProject, pid);
    DataStore.delete(modelToDelete);
    history.go()
  };


  return (
    <div>
      <Header />
      <div className="w-full flex items-center justify-center poppins">
        <div
          className="bg-black text-white pl-4 pr-4 h-full w-full m-5 sm:m-0 sm:w-[30rem] shadow-md shadow-slate-500 rounded-md mt-10 flex gap-3 flex-col items-center justify-center p-5 text-center"
          style={{
            backgroundImage: `url('https://s3.ap-south-1.amazonaws.com/aravindkumarv.com/bg.jpeg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p>Welcome to QuickShare</p>
          <p>to create a new project 👇</p>
          <a
            href="/newproject"
            className="bg-black text-white p-2 pl-4 pr-4 rounded cursor-pointer"
          >
            Create Project
          </a>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-10 p-10 items-center justify-center poppins">
        {Object.keys(data).length !== 0 || typeof data === "string"
          ? Object.keys(data).map((key, index) => {
              return (
                <div
                  key={key}
                  className="bg-white shadow-md shadow-slate-500 rounded p-5 h-40 w-52 flex flex-col items-center justify-between"
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                >
                  <p>{data[index].projectname}</p>
                  <div className="flex gap-2 items-center justify-end">
                    <a
                      href={"/projectpage/" + data[index].id}
                      className="text-xl cursor-pointer"
                    >
                      <IoOpen />
                    </a>
                    <p
                      className="text-xl cursor-pointer"
                      onClick={() => DeleteProject(data[index].id)}
                    >
                      <MdDelete />
                    </p>
                  </div>
                </div>
              );
            })
          : "No projects are created"}
      </div>
    </div>
  );
};

export default Home;
