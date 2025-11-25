import { useGetUserEnrollmentsQuery } from "@/entities/enrollment/enrollmentApi";
import { useAuthRole } from "@/shared/hooks/useAuthRole";
import MyCourseItem from "./components/MyCourseItem";
import { Box } from "@mui/material";

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
            <Box  >
                {data?.map((enrollment) =>
                    <MyCourseItem enrollment={enrollment} key={enrollment.course._id} />
                )}
            </Box>
        </div>
    );
}

export default ProfileCourses;