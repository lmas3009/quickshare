import { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "@aws-amplify/storage";
import { useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { NewProject } from "../../models";
import Header from "./header";
import history from "../../utils/history";

const fileTypes = ["pdf", "*"];

const ProjectPage = () => {
  const { pid } = useParams();
  const [data, setdata] = useState([]);

  const [_, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (file) => {
    setFile(file);
  };
  const onDrop = (fileOrFiles) => {
    // console.log(fileOrFiles);
    setSuccess(true);
  };
  const onSelect = async (fileOrFiles) => {
    // uploadfileslist("id", fileOrFiles);
    console.log(fileOrFiles);

    const res = await Storage.put(fileOrFiles[0].name, fileOrFiles[0]);
    const file = await Storage.get(fileOrFiles[0].name, {
      level: "public",
    });

    const original = await DataStore.query(NewProject, pid);
    var fileurls = new Array(JSON.stringify(Object.values(original.filesurl)));
    fileurls.push(file);

    await DataStore.save(
      NewProject.copyOf(original, (item) => {
        item.filesurl = fileurls;
      })
    );

    setSuccess(true);
  };

  const onTypeError = (err = 1) => console.log(err);
  const onSizeError = (err = 1) => console.log(err);

  useEffect(() => {
    DataStore.query(NewProject, (c) => c.id("eq", pid))
      .then((res) => {
        setdata(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, pid);

  return (
    <div>
      <Header />
      <div
        className="flex flex-col sm:flex-row poppins bg-white text-white shadow-md shadow-black m-5 p-10 items-center justify-between rounded-md"
        style={{
          backgroundImage: `url('https://s3.ap-south-1.amazonaws.com/aravindkumarv.com/bg.jpeg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center sm:items-start justify-center gap-1">
          <p>{data.projectname}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="bg-black text-white p-2 pl-4 pr-4 rounded cursor-pointer mt-5 sm:m-0">
            <p>Copy Password</p>
          </div>
          <FileUploader
            onTypeError={onTypeError}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            onSizeError={onSizeError}
            onDrop={onDrop}
            onSelect={onSelect}
            multiple={true}
            children={
              <div>
                {success === false ? (
                  <div className="bg-teal-800 text-white p-2 pl-4 pr-4 rounded cursor-pointer mt-5 sm:m-0">
                    <p>Upload files</p>
                  </div>
                ) : (
                  <div className="bg-teal-800 text-white p-2 pl-4 pr-4 rounded cursor-pointer mt-5 sm:m-0">
                    <p>File uploaded</p>
                  </div>
                )}
              </div>
            }
          />
        </div>
      </div>
      <div className="p-5 flex gap-3">
        {data.filesurl !== undefined
          ? Object.keys(data.filesurl).length !== 0
            ? Object.keys(data.filesurl).map((ele)=>{
              return <p>{data.filesurl[ele]}</p>
            })
            : "No Files found"
          : "Loading...."}
      </div>
    </div>
  );
};

export default ProjectPage;
