import FeaturedCourses from '@/widgets/sections/FeaturedCourses';
import MainSection from '@/widgets/sections/MainSection';
import WhySection from '@/widgets/sections/WhySection';
import { Box, Container } from '@mui/material';
function HomePage() {
    return (
        <Container maxWidth="lg" >
            <MainSection />
            <WhySection />
            <FeaturedCourses />
        </Container>
    );
}

export default HomePage;