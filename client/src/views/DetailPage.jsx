import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneJobs } from "../stores/actions/action";
import BeatLoader from "react-spinners/BeatLoader";

const DetailPage = () => {
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };
  const { loading, oneJobs } = useSelector((state) => {
    return state.jobs;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneJobs(id));
  }, []);

  return (
    <div className="job-detail-container">
      {loading ? (
        <div className="loading-container">
          <BeatLoader color={"#007bff"} loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="company-logo">
            <img
              style={{ width: 100 }}
              src={oneJobs.company_logo}
              alt="Company Logo"
            />
          </div>
          <Link to="/" className="go-back-button">
            <i
              style={{ marginRight: 5 }}
              className="fa-solid fa-arrow-left"
            ></i>
            Back
          </Link>
          <div className="job-detail-header">
            <p className="job-info">
              {oneJobs.company} -{" "}
              <strong style={{ color: "green" }}>{oneJobs.type} </strong>
            </p>
            <h1 className="job-title">{oneJobs.title}</h1>
          </div>

          <div className="job-detail-description">
            <h2 className="section-title">Job Description</h2>
            <div
              className={`description-content ${
                showFullDescription ? "show-full-description" : ""
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: oneJobs.description }} />
              {showFullDescription && <div className="blur-effect" />}
            </div>
            <button className="read-more-button" onClick={handleReadMoreClick}>
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className="job-detail-apply">
            <h2 className="section-title">How to Apply</h2>
            <div className="apply-content">
              <p
                dangerouslySetInnerHTML={{
                  __html: oneJobs.how_to_apply,
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
