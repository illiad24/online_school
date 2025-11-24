import { useGetUserEnrollmentsQuery } from "@/entities/enrollment/enrollmentApi";
import { useAuthRole } from "@/shared/hooks/useAuthRole";
import MyCourseItem from "./components/MyCourseItem";

function ProfileCourses() {
    const { user } = useAuthRole();


    const { data, isLoading } = useGetUserEnrollmentsQuery(user.id)

    if (isLoading) return (
        <div>
            Завантаження...
        </div>
    );

    return (
        <div>
            ProfileCourses
            <div>
                {data?.map((enrollment) =>
                    <MyCourseItem enrollment={enrollment} key={enrollment.course._id} />
                )}
            </div>
        </div>
    );
}

export default ProfileCourses;