import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Confetti from "react-confetti";

function UpdateJob() {
  const navigate = useNavigate();
  const { id } = useParams();

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
    attach_jd: [],
  });

  const [clients, setClients] = useState([]);
  const [filteredPocs, setFilteredPocs] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [managers, setManagers] = useState([]);
  const [clientSearch, setClientSearch] = useState("");

 useEffect(() => {
  axios
    .get(`http://localhost:8080/job/get-job/${id}`)
    .then((res) => {
      const job = res.data.job;
      setFormData({
        client: job.client?._id || "",
        poc: job.poc?._id || "",
        internal_recruiter: job.internal_recruiter || "",
        internal_manager: job.internal_manager || "",
        total_experience: job.total_experience || "",
        recent_experience: job.recent_experience || "",
        job_location: job.job_location || "",
        notice_period: job.notice_period || "",
        budget_from: job.budget_from || "",
        budget_to: job.budget_to || "",
        technology: job.technology || "",
        position: job.position || "",
       
        attach_jd: job.attachments || [],
      });
      setDescription(job.description || "");
    })
    .catch((err) => console.log(err));
}, [id]);

const removeExistingJD = (index) => {
  setFormData((prev) => {
    const updated = [...prev.attach_jd];
    updated.splice(index, 1);
    return { ...prev, attach_jd: updated };
  });
};

  useEffect(() => {
    axios.get("http://localhost:8080/clients/all").then((res) => {
      setClients(res.data.clients || []);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users?designation=recruter")
      .then((res) => setRecruiters(res.data.users || []));
    axios
      .get("http://localhost:8080/users?designation=manager")
      .then((res) => setManagers(res.data.users || []));
  }, []);

  useEffect(() => {
    if (formData.client) {
      axios
        .post("http://localhost:8080/poc/by-client", {
          client_id: formData.client,
        })
        .then((res) => setFilteredPocs(res.data.pocs || []));
    } else {
      setFilteredPocs([]);
    }
  }, [formData.client]);

  const handleSelectChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  
const handleUpdate = async () => {
  try {
    const dataToSend = new FormData();

    Object.entries({ ...formData, description }).forEach(([key, val]) => {
      if (key !== "attach_jd") dataToSend.append(key, val);
    });
    if (jdFiles?.length > 0) {
      Array.from(jdFiles).forEach((file) => dataToSend.append("attach_jd", file));
    }

    dataToSend.append("existing_attach_jd", JSON.stringify(formData.attach_jd));

    const res = await axios.put(
      `http://localhost:8080/job/update-job/${id}`,
      dataToSend,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.status === 200) {
      setFormData((prev) => ({ ...prev, attach_jd: res.data.job.attachments || [] }));
      setJdFiles(null);
      setAPIFetched(true);
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
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

      <div className="w-full">
        <TopNavigationBar title={"Update Job"} />

        {apiFetched && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute bg-black opacity-50 inset-0" />
            <div className="w-full max-w-lg p-6 relative rounded-xl shadow-lg bg-white">
              <Confetti width={300} height={200} />
              <div className="text-center p-4">
                <svg
                  fill="rgb(1,160,20)"
                  className="w-16 h-16 m-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z" />
                </svg>
                <h2 className="text-xl font-bold py-4">Updated Successfully</h2>
                <p className="text-sm text-gray-500 px-8">
                  Job has been updated successfully.
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
          <h2 className="text-2xl font-bold text-center mb-6">Update Job Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col w-full">
              <label className="font-semibold mb-1">Client</label>
              <select
                name="client"
                value={formData.client || ""}
                onChange={(e) => handleSelectChange(e, "client")}
                className="w-full p-3 border rounded-lg bg-white cursor-pointer"
              >
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.company_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">POC</label>
              <select
                value={formData.poc}
                onChange={(e) => setFormData({ ...formData, poc: e.target.value })}
                className="input input-bordered w-full"
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
                  (loc) => <option key={loc} value={loc} />
                )}
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

          <div className="flex flex-col col-span-2">
  <label>Attach JD</label>
  <label
    htmlFor="jdUpload"
    className="w-full p-3 border-2 border-dotted rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-200"
  >
    <div className="text-center text-gray-500">Click to Attach</div>
  </label>
  <input
    id="jdUpload"
    type="file"
    multiple
    className="hidden"
    onChange={(e) => setJdFiles(e.target.files)}
  />

  {formData.attach_jd?.length > 0 && (
  <div className="mt-3 p-3 border rounded-lg">
    {formData.attach_jd.map((file, index) => {
      const url = file.url ? `http://localhost:8080${file.url}` : `http://localhost:8080/uploads/${file}`;
      return (
        <div key={index} className="flex justify-between items-center mb-1">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {file.filename || file.split("/").pop()}
          </a>
          <button onClick={() => removeExistingJD(index)} className="text-red-500 hover:text-red-700 text-sm" type="button">
            Remove
          </button>
        </div>
      );
    })}
  </div>
)}

  {jdFiles && jdFiles.length > 0 && (
    <div className="mt-3 p-3 border rounded-lg bg-gray-50">
      {Array.from(jdFiles).map((file, idx) => (
        <p key={idx} className="text-sm text-gray-600">
          {file.name}
        </p>
      ))}
    </div>
  )}
</div>
            <div className="flex flex-col col-span-2">
              <label>Description</label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                className="h-40"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleUpdate}
              className="btn btn-wide bg-primary text-white hover:bg-black"
            >
              Update Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateJob;
