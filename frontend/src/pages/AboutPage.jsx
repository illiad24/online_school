import React from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Divider,
    Button,
    useTheme,
    useMediaQuery,
    Stack,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    Star,
    EmojiEvents,
    Person,
    TrendingUp,
    RocketLaunch,
    ChevronRight,
    CheckCircle,
    Gavel,
    AutoStories,
    Lightbulb,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Стилізований компонент для іконок
const IconWrapper = styled(Box)(({ theme, color = theme.palette.primary.main }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: `${color}10`,
    color: color,
    marginBottom: theme.spacing(2),
    minWidth: 60, // Фіксована ширина для ListItems
    transition: '0.3s ease-in-out',
    '& svg': {
        fontSize: 32,
    },
}));

function AboutPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Преміальні кольори
    const ACCENT_COLOR = "#0069d9"; // Глибокий синій (для кнопок/заголовків)
    const SECONDARY_COLOR = "#28a745"; // Зелений (для підтверджень)
    const BORDER_COLOR = "#e0e7f1";
    const BG_SECONDARY = "#f8f9fa"; // Світло-сірий для контрастної секції

    return (
        <div>
            Про нас
        </div>
    );
}

export default AboutPage;