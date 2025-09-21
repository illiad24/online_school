import CourseItem from "@/entities/cource/ui/CourseItem";
import { useAuthRole } from "@/shared/hooks/useAuthRole";

function ProfileCourses() {
    const { user } = useAuthRole();
    const userCourses = user?.courses
    if (!userCourses) return (
        <div>
            Не має курсів
        </div>
    );

    return (
        <div>
            ProfileCourses
            <div>
                {userCourses.map((course) =>
                    <CourseItem course={course} key={course._id} />
                )}
            </div>
        </div>
    );
}

export default ProfileCourses;