import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../stores/actions/action";
import formatDate from "../helpers/dateFormat";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);
  const filteredJobs = jobs.filter((job) => job);
  const [page, setPage] = useState(1);
  const [locationFilter, setLocationFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [fullTime, setFullTime] = useState(false);
  const perPage = 10;

  useEffect(() => {
    dispatch(
      fetchJobs({
        description: descriptionFilter,
        location: locationFilter,
        page: page,
      })
    );
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPage(newPage);
      dispatch(fetchJobs({ page: newPage }));
    }
  };

  const handleFilterClick = () => {
    dispatch(
      fetchJobs({
        description: descriptionFilter,
        location: locationFilter,
        full_time: fullTime ? "true" : "",
        page: 1,
      })
    );
    setPage(1);
  };

  return (
    <div className="job-list-container">
      <h2 style={{ textAlign: "center" }}>Job List</h2>
      <div className="filter-container">
        <div className="filter-location">
          <input
            placeholder="filter by location"
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
        <div className="filter-description">
          <input
            placeholder="filter by title, benefit, companies"
            type="text"
            value={descriptionFilter}
            onChange={(e) => setDescriptionFilter(e.target.value)}
          />
        </div>
        <div className="filter-full-time">
          <input
            type="checkbox"
            checked={fullTime}
            onChange={(e) => setFullTime(e.target.checked)}
          />
          <label>Full Time Only</label>
        </div>
        <button
          style={{
            marginLeft: "50px",
            width: "150px",
            height: "100%",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
          }}
          onClick={handleFilterClick}
        >
          Filter
        </button>
      </div>
      {loading ? (
        <div style={{ marginLeft: "40%", marginTop: 50 }}>
          <BeatLoader color={"#007bff"} loading={loading} size={50} />
        </div>
      ) : (
        <div className="job-list">
          {filteredJobs.map((job) => (
            <Link
              to={`/detail/${job.id}`}
              className="job-card"
              key={job.id}
              style={{ textDecoration: "none" }}
            >
              <div className="job-info">
                <h3 style={{ color: "#007bff" }}>{job.title}</h3>
                <p>
                  {job.company} -{" "}
                  <strong style={{ color: "green" }}>{job.type}</strong>
                </p>
              </div>
              <div className="job-details">
                <div>
                  <p style={{ marginBottom: -10 }}>
                    <strong>{job.location}</strong>
                  </p>
                </div>
                <div>
                  <p>{formatDate(job.created_at)}</p>
                </div>
              </div>
              {/* <button>View Details</button> */}
            </Link>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={
            filteredJobs?.length < perPage || filteredJobs?.length === 0
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
