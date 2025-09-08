import { Fragment } from "react";

function CourseItem({ course, actions }) {
    return (
        <div className="course-item">
            <h2 className="course-item__title">{course?.title}</h2>
            <p className="course-item__description">{course?.description}</p>
            <p className="course-item__price">{course?.price}</p>
            <div className="teacher-card__actions">
                <div></div>
                {actions?.map((action, index) =>
                    <Fragment key={index}>
                        {action}
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default CourseItem;