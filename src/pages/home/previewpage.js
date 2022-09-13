import React,{ useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { useParams } from "react-router-dom";
import { NewProject } from "../../models";
import Header from "../landingpage/header";

const previewPage = () => {
  // const { pid } = useParams();
  // const [data, setdata] = useState([]);

  // useEffect(() => {
  //   DataStore.query(NewProject, (c) => c.id("eq", pid))
  //     .then((res) => {
  //       setdata(res[0]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, pid);

  return (
    <div>
      <Header />
      {/* <div
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
      </div>
     {} <div className="flex flex-col p-10 poppins">
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
                            {Number(item)+1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {JSON.parse(data.filesurl)[item].filename}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap cursor-pointer">
                            <a href={JSON.parse(data.filesurl)[item].file} target="_blank">
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
      </div> */}
      <div className="p-5 flex flex-col gap-10"></div>
    </div>
  );
};

export default previewPage;
