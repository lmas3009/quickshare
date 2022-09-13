import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "@aws-amplify/storage";
import { useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { CopyToClipboard } from "react-copy-to-clipboard";
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

    const filename = fileOrFiles[0].name;

    const original = await DataStore.query(NewProject, pid);
    var fileurls = JSON.parse(original.filesurl);
    const data = {
      file: file,
      filename: filename,
    };
    fileurls[Object.keys(fileurls).length] = data;
    // fileurls.push(file);

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
    Auth.currentAuthenticatedUser()
      .then((res) => {
        // setdata(res["username"]);
      })
      .catch((err) => {
        history.push("/");
        history.go();
      });

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
          <div className="bg-rose-700 text-white p-2 pl-4 pr-4 rounded cursor-pointer mt-5 sm:m-0">
            <CopyToClipboard
              text={"http://localhost:3000/projectpreview/" + pid}
              onCopy={() => alert("coppied")}
            >
              <p>Share Link</p>
            </CopyToClipboard>
          </div>

          <div className="bg-black text-white p-2 pl-4 pr-4 rounded cursor-pointer mt-5 sm:m-0">
            <CopyToClipboard
              text={data.password}
              onCopy={() => alert("Password Coppied")}
            >
              <p>Copy Password</p>
            </CopyToClipboard>
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
      <div className="flex flex-col p-10 poppins">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      FileName
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Download file
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.filesurl === undefined ? (
                    <tr className="bg-gray-100 border-b">
                      <td
                        colspan="3"
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                      >
                        No files are present
                      </td>
                    </tr>
                  ) : (
                    Object.keys(JSON.parse(data.filesurl)).map((item) => {
                      return (
                        <tr className="bg-gray-100 border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {Number(item) + 1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {JSON.parse(data.filesurl)[item].filename}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer">
                            <a
                              href={JSON.parse(data.filesurl)[item].file}
                              target="_blank"
                            >
                              download
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-10"></div>
    </div>
  );
};

export default ProjectPage;
