import React, { useEffect, useState } from "react";
import Header from "./header";
import { Auth } from "aws-amplify";
import history from "../../utils/history";
import { DataStore } from "@aws-amplify/datastore";
import { NewProject } from "../../models";
import { IoOpen } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Storage } from "@aws-amplify/storage";

const Home = () => {
  const [data, setdata] = useState([]);
  const [uid, setuid] = useState("");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async (res) => {
        setuid(res["username"]);
        const _data = await DataStore.query(NewProject, (c) =>
          c.userid("eq", res["username"])
        );
        setdata(_data);
      })
      .catch((err) => {
        history.push("/");
        history.go();
      });
  });

  const DeleteProject = async (pid) => {
    const modelToDelete = await DataStore.query(NewProject, pid);
    const data =
      modelToDelete.filesurl === undefined
        ? ""
        : JSON.parse(modelToDelete.filesurl);
    await Storage.remove(uid + "_3009_" + data[0].filename);
    await DataStore.delete(modelToDelete);
    history.go();
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
        {Object.keys(data).length !== 0
          ? typeof data !== "string"
            ? Object.keys(data).map((key, index) => {
                return (
                  <div
                    key={key}
                    className="bg-white text-black shadow-xl shadow-current border-2 border-slate-600 rounded p-5 h-full w-52 flex flex-col items-start justify-between"
                  >
                    <p className="text-xl pb-2">{data[index].projectname}</p>
                    <div className="flex gap-5 items-center justify-end">
                      <a
                        href={"/projectpage/" + data[index].id}
                        className="text-sm flex items-center gap-1 cursor-pointer"
                      >
                        Open <IoOpen />
                      </a>
                      <p
                        className="text-sm flex items-center gap-1 cursor-pointer"
                        onClick={() => DeleteProject(data[index].id)}
                      >
                        Delete <MdDelete />
                      </p>
                    </div>
                  </div>
                );
              })
            : "No Projects are created"
          : "No Projects are created"}
      </div>
    </div>
  );
};

export default Home;
