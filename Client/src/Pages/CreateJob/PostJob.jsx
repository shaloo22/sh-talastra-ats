import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Confetti from "react-confetti";
import DownImg from "../../assets/icons/down.svg";

function PostJob() {
  const navigate = useNavigate();
  const [apiFetched, setAPIFetched] = useState(false);
  const [description, setDescription] = useState("");
  const [jdFiles, setJdFiles] = useState(null);
  const [formData, setFormData] = useState({
  client: "",
  poc: "",
  internal_recruiter: "",
  internal_manager: "",
  total_experience: "",
  recent_experience: "",
  job_location: "",
  notice_period: "",
  budget_from: "",
  budget_to: "",
  technology: "",
  position: "",
  description: "",
  attach_jd: [],  
});

  const [clients, setClients] = useState([]);
  const [filteredPocs, setFilteredPocs] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [managers, setManagers] = useState([]);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/clients/all")
      .then((res) => setClients(res.data.clients || []))
      .catch((err) => console.error("Clients Error:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users?designation=recruter")
      .then((res) => setRecruiters(res.data.users || []))
      .catch((err) => console.error("Recruiters Error:", err));

    axios
      .get("http://localhost:8080/users?designation=manager")
      .then((res) => setManagers(res.data.users || []))
      .catch((err) => console.error("Managers Error:", err));
  }, []);
  useEffect(() => {
    if (formData.client) {
      axios
        .post("http://localhost:8080/poc/by-client", { client_id: formData.client })
        .then((res) => setFilteredPocs(res.data.pocs || []))
        .catch((err) => console.error("POCs Error:", err));
    } else {
      setFilteredPocs([]);
      setFormData({ ...formData, poc: "" });
    }
  }, [formData.client]);

  const handleSubmit = async () => {
    try {
      const form = new FormData();

      Object.entries({
        ...formData,
        description,
      }).forEach(([key, val]) => {
        if (key !== "attach_jd") form.append(key, val);
      });

      if (jdFiles && jdFiles.length > 0) {
        Array.from(jdFiles).forEach((file) => form.append("attach_jd", file));
      }

      const res = await axios.post("http://localhost:8080/job/post", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

     if (res.status === 200) {
  setFormData((prev) => ({ ...prev, attach_jd: res.data.attach_jd }));
  setJdFiles(null); 
  setAPIFetched(true);
}
    } catch (err) {
      console.log("POST JOB ERROR:", err.response?.data || err.message);
    }
  };

  const filteredClients = clients.filter((c) =>
    c.company_name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full min-h-screen">
        <TopNavigationBar title={"Jobs"} />

        {apiFetched && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute bg-black opacity-50 inset-0 z-0" />
            <div className="w-full max-w-lg p-6 relative mx-auto rounded-xl shadow-lg bg-white z-10">
              <Confetti width={300} height={200} />
              <div className="text-center p-4">
                <svg
                  fill="rgb(1,160,20)"
                  className="w-16 h-16 m-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z" />
                </svg>
                <h2 className="text-xl font-bold py-4">Congratulations</h2>
                <p className="text-sm text-gray-500 px-8">
                  Job has been posted successfully
                </p>
                <button
                  onClick={() => navigate("/jobs")}
                  className="mt-4 text-lg bg-gray-900 px-5 py-2 text-white rounded-full hover:bg-black"
                >
                  Continue...
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-4/5 max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create New Job
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
            <div className="flex flex-col relative">
              <label className="font-semibold mb-1">Client</label>
              <button
                onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                className="input input-bordered w-full flex justify-between items-center"
              >
                {formData.client
                  ? clients.find((c) => c._id === formData.client)?.company_name
                  : "Select Client"}
                <img
                  src={DownImg}
                  className={`w-4 h-4 ml-2 transition-transform ${
                    clientDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {clientDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-50 mt-1">
                  <input
                    type="text"
                    placeholder="Search client..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="border-b border-gray-300 p-2 w-full focus:outline-none"
                  />
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <div
                        key={client._id}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          formData.client === client._id ? "bg-gray-200" : ""
                        }`}
                        onClick={() => {
                          setFormData({ ...formData, client: client._id, poc: "" });
                          setClientDropdownOpen(false);
                        }}
                      >
                        {client.company_name}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">No clients found</div>
                  )}
                </div>
              )}
            </div>

          
            <div className="flex flex-col">
              <label className="font-semibold mb-1">POC</label>
              <select
                value={formData.poc}
                onChange={(e) => setFormData({ ...formData, poc: e.target.value })}
                className="input input-bordered w-full"
                disabled={!formData.client || filteredPocs.length === 0}
              >
                <option value="">Select POC</option>
                {filteredPocs.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.poc_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Internal Recruiter</label>
              <select
                value={formData.internal_recruiter}
                onChange={(e) =>
                  setFormData({ ...formData, internal_recruiter: e.target.value })
                }
                className="input input-bordered w-full"
              >
                <option value="">Select Recruiter</option>
                {recruiters.map((r) => (
                  <option key={r._id} value={r.f_name + " " + r.last_name}>
                    {r.f_name} {r.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Internal Manager</label>
              <select
                value={formData.internal_manager}
                onChange={(e) =>
                  setFormData({ ...formData, internal_manager: e.target.value })
                }
                className="input input-bordered w-full"
              >
                <option value="">Select Manager</option>
                {managers.map((r) => (
                  <option key={r._id} value={r.f_name}>
                    {r.f_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Technology</label>
              <input
                list="techList"
                type="text"
                value={formData.technology}
                onChange={(e) =>
                  setFormData({ ...formData, technology: e.target.value })
                }
                placeholder="Select Technology"
                className="input input-bordered w-full"
              />
              <datalist id="techList">
                <option value="React" />
                <option value="Node.js" />
                <option value="Python" />
                <option value="Java" />
                <option value="Angular" />
              </datalist>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Position</label>
              <input
                list="PositionList"
                type="text"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                placeholder="Select Position"
                className="input input-bordered w-full"
              />
              <datalist id="PositionList">
                <option value="Lead" />
                <option value="Java-developer" />
                <option value="Architect" />
                <option value="Manager" />
                <option value="BDE" />
              </datalist>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Total Experience (Years)</label>
              <input
                type="number"
                value={formData.total_experience}
                onChange={(e) =>
                  setFormData({ ...formData, total_experience: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="e.g. 5"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Recent Experience (Years)</label>
              <input
                type="number"
                value={formData.recent_experience}
                onChange={(e) =>
                  setFormData({ ...formData, recent_experience: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="e.g. 2"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Job Location</label>
              <input
                list="joblocations"
                value={formData.job_location}
                onChange={(e) =>
                  setFormData({ ...formData, job_location: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Select or type location"
              />
              <datalist id="joblocations">
                {["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Gurgaon", "Other"].map(
                  (loc) => <option key={loc} value={loc} />)}
              </datalist>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Notice Period</label>
              <input
                list="noticeperiod"
                value={formData.notice_period}
                onChange={(e) =>
                  setFormData({ ...formData, notice_period: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="e.g. 2"
              />
              <datalist id="noticeperiod">{[0, 1, 2, 3].map((n) => <option key={n} value={n} />)}</datalist>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Budget (₹)</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={formData.budget_from}
                  onChange={(e) =>
                    setFormData({ ...formData, budget_from: e.target.value })
                  }
                  className="input input-bordered w-1/2"
                  placeholder="From"
                />
                <input
                  type="number"
                  value={formData.budget_to}
                  onChange={(e) =>
                    setFormData({ ...formData, budget_to: e.target.value })
                  }
                  className="input input-bordered w-1/2"
                  placeholder="To"
                />
              </div>
            </div>

            <div className="flex flex-col ">
              <label className="font-semibold mb-1">Attach JD</label>
              <label
                htmlFor="jdUpload"
                className="w-full p-3 border-2 border-dotted border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
              >
                <div className="text-center text-gray-500">
                  <p className="font-medium">Click to Attach</p>
                </div>
              </label>
              <input
                id="jdUpload"
                type="file"
                multiple
                onChange={(e) => setJdFiles(e.target.files)}
                className="hidden"
              />
               {formData.attach_jd && formData.attach_jd.length > 0 && (
                <div className="mt-2 bg-white p-3 rounded-lg shadow-sm border">
                   {formData.attach_jd.map((fileUrl, index) => {
                    const url = fileUrl.startsWith("/uploads/")
                    ? `http://localhost:8080${fileUrl}`
                    : `http://localhost:8080/uploads/${fileUrl}`;
                    return (
                    <p key={index} className="text-sm text-gray-600">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                        {fileUrl.split("/").pop()}</a></p>
                        );
                        })}
                        </div>)}
                        </div>
                        <div className="flex flex-col col-span-2">
                          <label className="font-semibold mb-1">Description</label>
                            <ReactQuill
                              value={description}
                              onChange={setDescription}
                              className="h-35"
                              placeholder="Enter job description..."
                            />
                          </div>
                        </div>
                        <div className="mt-12 text-center">
                          <button
                            onClick={handleSubmit}
                            className="btn btn-wide bg-primary text-white hover:bg-black"
                          >
                            Create job
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

export default PostJob;
