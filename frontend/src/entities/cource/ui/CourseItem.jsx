import LessonItem from "@/entities/lesson/ui/LessonItem";
import LessonForm from "@/widgets/lesson/SelectLesson";
import { Fragment } from "react";

function CourseItem({ course, actions, isAddingLesson }) {
    return (
        <div className="course-item">
            <h2 className="course-item__title">{course?.title}</h2>
            <p className="course-item__description">{course?.description}</p>
            <p className="course-item__price">{course?.price}</p>

            <div>
                <h3>Уроки:</h3>
                <div>
                    {course?.lessons?.length > 0 ? (
                        course.lessons.map((lesson) => (
                            <LessonItem key={lesson._id} lesson={lesson} />
                        ))
                    ) : (
                        <div>Уроки не додано.</div>
                    )}
                </div>
            </div>

            {isAddingLesson && (
                <div className="course-item__lesson-form">
                    <LessonForm courseId={course._id} />
                </div>
            )}

            <div className="teacher-card__actions">
                {actions?.map((action, index) => (
                    <Fragment key={index}>{action}</Fragment>
                ))}
            </div>
        </div>
    );
}

export default CourseItem;
