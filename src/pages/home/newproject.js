import React, { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Auth } from "aws-amplify";
import { NewProject } from "../../models";
import Header from "./header";
import history from "../../utils/history";

const Newproject = () => {
  const [projectName, setprojectName] = useState("");
  const [projectPass, setprojectPass] = useState("");
  const [NameActive, setNameActive] = useState(false);
  const [NameError, setNameError] = useState("");
  const [uid,setUid] = useState("")

  const CreateProject = async () => {
    await Auth.currentUserInfo().then((res)=>{
      setUid(res['username'])
    })
    await DataStore.save(
      new NewProject({
        projectname: projectName,
        filesurl: new Array("https://quickshare-storage185229-dev.s3.ap-south-1.amazonaws.com/public/readme.txt"),
        password: projectPass,
        userid: uid
      })
    )
      .then((res) => {
        history.push("/projectpage/"+res.id);
        history.go();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const VerifyProject = async () => {
    const data = await DataStore.query(NewProject, (c) =>
      c.projectname("eq", projectName)
    );
    if (data.length!==0) {
      setNameError("Project Name already present");
    } else {
      setNameError("");
      setNameActive(true)
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full flex flex-col items-center justify-center poppins mt-10">
        <p className="text-xl">Create a new project</p>
        <div className="flex flex-col mt-10">
          <label>Project name</label>
          <input
            type="text"
            placeholder="Enter project name"
            className="border-2 border-black p-2 rounded-t rounded-l w-64 sm:w-96"
            onChange={(e) => setprojectName(e.target.value)}
          />
          <p className="text-sm text-red-700">{NameError}</p>
          <div className="w-full flex items-center justify-end">
            <p
              className="bg-teal-700 text-white p-1 pl-5 pr-5 rounded-b cursor-pointer"
              onClick={() => VerifyProject()}
            >
              Next
            </p>
          </div>
        </div>
        {NameActive ? (
          <div className="flex flex-col mt-10 ">
            <label>Project password</label>
            <input
              type="text"
              placeholder="Enter project password"
              defaultValue={projectPass}
              className="border-2 border-black p-2 rounded-t rounded-l w-64 sm:w-96"
              onChange={(e) => setprojectPass(e.target.value)}
            />
            <div className="w-full flex items-center justify-end">
              <p
                className="bg-teal-700 text-white p-1 pl-5 pr-5 rounded-b cursor-pointer"
                onClick={() => CreateProject()}
              >
                Create Project
              </p>
            </div>
          </div>
        ) : (
          "Add your project name"
        )}
      </div>
    </div>
  );
};

export default Newproject;
