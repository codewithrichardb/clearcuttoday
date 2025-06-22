import React from "react";
import { FaEdit, FaSmile, FaTrash } from "react-icons/fa";

function RecentJournal({
  date,
  content,
  tags,
}: {
  date: string;
  content: string;
  tags: string[];
}) {
  return (
    <>
      <div className="d-flex align-items-top justify-content-between mb-3">
        <div className="d-flex align-items-top justify-content-start">
          <div
            className={`recent-journals-card-icons bg-light rounded-3 mb-4 d-flex justify-content-center align-items-center me-2 text-muted`}
          >
            <FaSmile />
          </div>
          <div>
            <p className="fw-semibold mb-1">{date}</p>
            <p className="text-muted mb-2 small">{content}</p>
            <div>
              {tags?.map((tag) => (
                <React.Fragment key={tag}>
                  <span className="badge bg-primary me-2 bg-opacity-10 text-primary">
                    #{tag}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button className="btn border-0 text-muted">
            <FaEdit />
          </button>
          <button className="btn border-0 text-muted">
            <FaTrash />
          </button>
        </div>
      </div>
    </>
  );
}

export default RecentJournal;
