import { useGetCourseByIdQuery } from "@/entities/cource/api/courseApi";
import { useParams } from "react-router";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuthRole } from "@/shared/hooks/useAuthRole";
import { Fragment } from "react";

function CourseDetails() {
    const { isAdmin, isStudent } = useAuthRole();


    const { id } = useParams();
    const { data: course, isLoading, error } = useGetCourseByIdQuery(id);
    console.log(course);

    if (isLoading) return <Typography>Завантаження...</Typography>;
    if (error) return <Typography color="error">Сталася помилка при завантаженні курсу</Typography>;
    if (!course) return <Typography>Курс не знайдено</Typography>;

    return (
        <Card sx={{ maxWidth: 700, margin: "20px auto", boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {course.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Опис:</strong> {course.description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <strong>Викладач:</strong> {course?.teacher?.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <strong>Ціна:</strong> {course.price} грн
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">Уроки ({course.lessons?.length})</Typography>

                {course.lessons?.map((lesson, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`lesson-${index}-content`}
                            id={`lesson-${index}-header`}
                        >
                            <Typography>
                                {index + 1}. {lesson.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{lesson.content}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}

                <Divider sx={{ my: 2 }} />
                {isAdmin &&
                    <Fragment>
                        <Typography variant="h6">
                            Користувачі ({course.users?.length})
                        </Typography>
                        <List dense>
                            {course.users?.map((user, index) => (
                                <ListItem key={index}>{user.name}</ListItem>
                            ))}
                        </List>
                    </Fragment>
                }
                {isStudent &&
                    <Typography variant="h6">
                        Кількість учасників ({course.users?.length})
                    </Typography>

                }
            </CardContent>
        </Card>
    );
}

export default CourseDetails;
