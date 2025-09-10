import { Fragment } from "react";

function LessonItem({ lesson, actions }) {
    return (
        <div className="lesson-item bg-red-800 p-4 m-2 rounded text-white">
            <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>

            <p><strong>ID:</strong> {lesson._id}</p>
            <p><strong>Content:</strong> {lesson.content}</p>
            <p><strong>Duration:</strong> {lesson.duration} хв</p>
            <p><strong>Teacher ID:</strong> {lesson.teacher?.title}</p>
            <p>
                <strong>Created At:</strong>{" "}
                {lesson.createdAt ? new Date(lesson.createdAt).toLocaleString("uk-UA") : ""}
            </p>

            <p>
                <strong>Updated At:</strong>{" "}
                {lesson.updatedAt ? new Date(lesson.updatedAt).toLocaleString("uk-UA") : ""}
            </p>

            <div className="lesson-item__actions mt-3 flex gap-2">
                {actions.map((action, index) => (
                    <Fragment key={index}>
                        {action}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default LessonItem;
