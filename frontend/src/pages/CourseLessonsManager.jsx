import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Autocomplete,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Container
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useGetCourseByIdQuery, useAddLessonToCourseMutation, useRemoveLessonFromCourseMutation, useUpdateLessonsOrderMutation } from "@/entities/cource/api/courseApi";
import { useGetLessonsQuery } from "@/entities/lesson/api/lessonApi";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";

// Компонент для окремого уроку з drag listeners тільки на іконці
function SortableLessonItem({ id, lesson, lessonId, lessonTitle, index, onRemove, isRemoving }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const idToRemove = typeof lessonId === 'object' ? (lessonId._id || lessonId) : lessonId;

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('Delete button clicked, lessonId:', idToRemove);
        onRemove(idToRemove);
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <ListItem
                secondaryAction={
                    <IconButton
                        edge="end"
                        onClick={handleDeleteClick}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        disabled={isRemoving}
                        color="error"
                        aria-label="Видалити урок"
                    >
                        <DeleteIcon />
                    </IconButton>
                }
                sx={{
                    bgcolor: 'background.paper',
                    mb: 1,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box
                    {...listeners}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'grab',
                        mr: 2,
                        touchAction: 'none',
                        '&:active': {
                            cursor: 'grabbing',
                        }
                    }}
                >
                    <DragIndicatorIcon
                        sx={{
                            color: 'text.secondary'
                        }}
                    />
                </Box>
                <ListItemText
                    primary={`${index + 1}. ${lessonTitle}`}
                    secondary={typeof lesson === 'object' && lesson.duration
                        ? `Тривалість: ${lesson.duration} хв`
                        : null
                    }
                />
            </ListItem>
        </div>
    );
}

export default function CourseLessonsManager() {
    const { id: courseId } = useParams();
    const navigate = useNavigate();

    const { data: course, isLoading: courseLoading, error: courseError } = useGetCourseByIdQuery(courseId);
    const { data: lessonsList, isLoading: lessonsLoading } = useGetLessonsQuery();

    const [addLessonToCourse, { isLoading: isAdding }] = useAddLessonToCourseMutation();
    const [removeLessonFromCourse, { isLoading: isRemoving }] = useRemoveLessonFromCourseMutation();
    const [updateLessonsOrder, { isLoading: isUpdatingOrder }] = useUpdateLessonsOrderMutation();

    const [selectedLesson, setSelectedLesson] = useState(null);
    const [localLessons, setLocalLessons] = useState([]);

    // Оновлюємо локальний стан при зміні курсу
    useEffect(() => {
        if (course?.lessons) {
            setLocalLessons(course.lessons);
        }
    }, [course]);

    // Фільтруємо доступні уроки (ті, що ще не додані до курсу)
    const availableLessons = lessonsList?.filter(
        lesson => !localLessons.some(courseLesson =>
            (typeof courseLesson === 'object' ? courseLesson._id : courseLesson)?.toString() === lesson._id?.toString()
        )
    ) || [];

    const handleAddLesson = async () => {
        if (!selectedLesson) return;

        try {
            await addLessonToCourse({
                courseId,
                lessonId: selectedLesson._id
            }).unwrap();

            // Оновлюємо локальний стан
            setLocalLessons(prev => [...prev, selectedLesson]);
            setSelectedLesson(null);
        } catch (error) {
            console.error('Error adding lesson:', error);
            alert('Помилка додавання уроку');
        }
    };

    const handleRemoveLesson = async (lessonId) => {
        console.log('handleRemoveLesson called with:', lessonId);

        if (!lessonId) {
            console.error('Lesson ID is missing');
            return;
        }

        if (!window.confirm('Ви впевнені, що хочете видалити цей урок з курсу?')) {
            return;
        }

        try {
            // Переконуємося, що lessonId - це рядок
            const lessonIdString = typeof lessonId === 'object' ? (lessonId._id || lessonId) : lessonId;
            const finalLessonId = lessonIdString?.toString() || String(lessonIdString);

            console.log('Removing lesson with ID:', finalLessonId, 'from course:', courseId);

            const result = await removeLessonFromCourse({
                courseId,
                lessonId: finalLessonId
            }).unwrap();

            console.log('Lesson removed successfully:', result);

            // Оновлюємо локальний стан
            setLocalLessons(prev => {
                const filtered = prev.filter(lesson => {
                    const id = typeof lesson === 'object' ? (lesson._id || lesson) : lesson;
                    const idString = id?.toString() || String(id);
                    return idString !== finalLessonId;
                });
                console.log('Updated lessons list:', filtered);
                return filtered;
            });
        } catch (error) {
            console.error('Error removing lesson:', error);
            alert('Помилка видалення уроку: ' + (error?.data?.error || error?.message || 'Невідома помилка'));
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = localLessons.findIndex(lesson => {
            const id = typeof lesson === 'object' ? lesson._id : lesson;
            return id?.toString() === active.id?.toString();
        });
        const newIndex = localLessons.findIndex(lesson => {
            const id = typeof lesson === 'object' ? lesson._id : lesson;
            return id?.toString() === over.id?.toString();
        });

        if (oldIndex === -1 || newIndex === -1) return;

        const newLessonsOrder = arrayMove(localLessons, oldIndex, newIndex);
        setLocalLessons(newLessonsOrder);

        // Оновлюємо порядок на сервері
        try {
            const lessonsOrder = newLessonsOrder.map(lesson =>
                typeof lesson === 'object' ? lesson._id : lesson
            );
            await updateLessonsOrder({ courseId, lessonsOrder }).unwrap();
        } catch (error) {
            console.error('Error updating lessons order:', error);
            // Відкатуємо зміни при помилці
            if (course?.lessons) {
                setLocalLessons(course.lessons);
            }
            alert('Помилка оновлення порядку уроків');
        }
    };

    if (courseLoading || lessonsLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (courseError) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">Помилка завантаження курсу</Alert>
            </Container>
        );
    }

    if (!course) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="warning">Курс не знайдено</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate(navigateRoutes.navigate.courses.getCourseById(courseId))}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1">
                    Управління уроками курсу
                </Typography>
            </Box>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Кількість уроків: {localLessons.length}
                </Typography>
            </Paper>

            {/* Форма додавання уроку */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Додати урок до курсу
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Autocomplete
                        sx={{ flexGrow: 1 }}
                        options={availableLessons}
                        getOptionLabel={(option) => option.title || ''}
                        value={selectedLesson}
                        onChange={(e, val) => setSelectedLesson(val)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Виберіть урок"
                                placeholder="Пошук уроку..."
                            />
                        )}
                        disabled={isAdding || availableLessons.length === 0}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddLesson}
                        disabled={!selectedLesson || isAdding || availableLessons.length === 0}
                    >
                        {isAdding ? 'Додаємо...' : 'Додати урок'}
                    </Button>
                </Box>
                {availableLessons.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Всі доступні уроки вже додані до курсу
                    </Typography>
                )}
            </Paper>

            {/* Список уроків з DnD */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Уроки курсу (перетягніть для зміни порядку)
                </Typography>

                {localLessons.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        У курсі поки немає уроків. Додайте перший урок вище.
                    </Typography>
                ) : (
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={localLessons.map(lesson => {
                                const id = typeof lesson === 'object' ? lesson._id : lesson;
                                return id?.toString();
                            })}
                            strategy={verticalListSortingStrategy}
                        >
                            <List>
                                {localLessons.map((lesson, index) => {
                                    const lessonId = typeof lesson === 'object' ? lesson._id : lesson;
                                    const lessonTitle = typeof lesson === 'object' ? lesson.title : 'Урок';
                                    const lessonIdString = lessonId?.toString() || String(lessonId);

                                    return (
                                        <SortableLessonItem
                                            key={lessonIdString || index}
                                            id={lessonIdString}
                                            lesson={lesson}
                                            lessonId={lessonId}
                                            lessonTitle={lessonTitle}
                                            index={index}
                                            onRemove={handleRemoveLesson}
                                            isRemoving={isRemoving}
                                        />
                                    );
                                })}
                            </List>
                        </SortableContext>
                    </DndContext>
                )}

                {isUpdatingOrder && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
