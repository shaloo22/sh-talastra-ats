const GetJob = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "No id found" });
    }

    const jobs = await Job.find({ client: id });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Server error while fetching jobs" });
  }
};

module.exports = GetJob;






