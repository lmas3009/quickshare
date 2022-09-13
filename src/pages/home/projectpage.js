import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NewProject } from "../../models";
import Header from "./header";
import history from "../../utils/history";

const ProjectPage = () => {
  const { pid } = useParams();
  const [data, setdata] = useState([]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((res) => {
        setdata(res["username"]);
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
  }, [pid]);

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
          <p className="text-xl">{data.projectname}</p>
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
                        colSpan="3"
                        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                      >
                        No files are present
                      </td>
                    </tr>
                  ) : (
                    <tr className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        1
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data.filesurl
                          ? JSON.parse(data.filesurl)[0].filename
                          : ""}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer">
                        <a
                          href={
                            data.filesurl
                              ? JSON.parse(data.filesurl)[0].file
                              : ""
                          }
                          rel="noreferrer"
                          target="_blank"
                        >
                          download
                        </a>
                      </td>
                    </tr>
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
