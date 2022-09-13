import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "@aws-amplify/storage";
import { Auth } from "aws-amplify";
import { NewProject } from "../../models";
import Header from "./header";
import history from "../../utils/history";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["pdf", "*"];

const Newproject = () => {
  const [projectName, setprojectName] = useState("");
  const [NameActive, setNameActive] = useState(false);
  const [NameError, setNameError] = useState("");
  const [uid, setUid] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    Auth.currentUserInfo().then((res) => {
      setUid(res["username"]);
    });
  });

  const onSelect = async (fileOrFiles) => {
    setloading(true);

    await Storage.put(uid + "_3009_" + fileOrFiles.name, fileOrFiles);
    const file = await Storage.get(fileOrFiles.name, {
      level: "public",
    });

    const filename = fileOrFiles.name;

    const _data = {
      filename: filename,
      file: file,
    };
    setdata(_data);
    setSuccess(true);
    setloading(false);
  };

  const onTypeError = (err = 1) => console.log(err);
  const onSizeError = (err = 1) => console.log(err);

  const CreateProject = async () => {
    await DataStore.save(
      new NewProject({
        projectname: projectName,
        filesurl: [data],
        userid: uid,
      })
    )
      .then((res) => {
        history.push("/projectpage/" + res.id);
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
    if (data.length !== 0) {
      setNameError("Project Name already present");
    } else {
      setNameError("");
      setNameActive(true);
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
              Verify Project
            </p>
          </div>
        </div>
        {NameActive ? (
          <div className="flex flex-col mt-10 ">
            <label>Upload File</label>

            <FileUploader
              onTypeError={onTypeError}
              name="file"
              types={fileTypes}
              onSizeError={onSizeError}
              onSelect={onSelect}
              multiple={false}
              children={
                <div>
                  {success === false ? (
                    <div className="bg-teal-800 text-white p-2 pl-4 pr-4 rounded cursor-pointer mt-5 sm:m-0  w-64 sm:w-96">
                      <p className="flex items-center gap-2">
                        {loading ? (
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokwidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <></>
                        )}
                        Upload files
                      </p>
                    </div>
                  ) : (
                    <div className="bg-teal-800 text-white p-2 pl-4 pr-4 rounded cursor-pointer mt-5 sm:m-0  w-64 sm:w-96">
                      <p>File uploaded</p>
                    </div>
                  )}
                </div>
              }
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
