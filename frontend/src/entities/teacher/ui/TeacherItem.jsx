import { Fragment } from "react";

function TeacherItem({ teacher, actions }) {
    if (!teacher) {
        return null;
    }

    return (
        <div className="teacher-card">
            <div className="teacher-card__details">
                <div className="teacher-card__detail-item">
                    <span>Name:</span> {teacher?.name}
                </div>
                <div className="teacher-card__detail-item">
                    <span>Email:</span> {teacher?.email}
                </div>
                <div className="teacher-card__detail-item">
                    <span>Subject:</span> {teacher?.subject}
                </div>
                <div className="teacher-card__detail-item">
                    <span>Experience:</span> {teacher?.experience} years
                </div>
                <div className="teacher-card__detail-item">
                    <span>Age:</span> {teacher?.age}
                </div>
                <p className="teacher-card__bio">
                    {teacher?.bio}
                </p>
            </div>
            <div className="teacher-card__actions">
                <div></div>
                {actions.map((action, index) =>
                    <Fragment key={index}>
                        {action}
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default TeacherItem;