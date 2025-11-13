// import React, { useEffect, useState } from "react";
// import axios from "axios"; // uncomment axios
// import ShowPocElement from "./Component/ShowPocElement";
// import POCHeader from "./Component/POCHeader";
// import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
// import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";

// function POCHome() {
//   const [data, setData] = useState([]); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/client/poc/list",
//           { status: "ACTIVE" },
//           {
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json;charset=UTF-8",
//             },
//           }
//         );

//         console.log("POC List:", response.data);
//         setData(response.data.clients || []);
//       } catch (error) {
//         console.error("Error fetching POC list:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex bg-white min-h-screen">
//       {/* Left Sidebar */}
//       <div className="hidden sm:block w-2/12 bg-white h-screen">
//         <LeftMenuBar />
//       </div>

//       {/* Main Content */}
//       <div className="w-full bg-background">
//         <TopNavigationBar title={"POC"} />
//         <POCHeader setData={setData} />

//         <div className="w-11/12 mx-auto mt-8">
//           {/* Professional list view like ClientHome */}
//           <ShowPocElement data={data} setData={setData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default POCHome;

import React, { useEffect, useState } from "react";
import axios from "axios"; // uncomment axios
import ShowPocElement from "./Component/ShowPocElement";
import POCHeader from "./Component/POCHeader";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";

function POCHome() {
  const [data, setData] = useState([]); 

    useEffect(() => {
    const fetchData = async () => {
      // axios POST request
      const options = {
        url: "http://localhost:8080/poc/list",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { status : "ACTIVE" },
      };

      axios(options).then((response) => {
         console.log(response);
        setData(response.data.clients);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="flex bg-white min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
{/* Main Content */}
      <div className="w-full bg-background">
        <TopNavigationBar title={"POC"} />
        <POCHeader setData={setData} />

        <div className="w-11/12 mx-auto mt-8">
          
          <ShowPocElement data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default POCHome;