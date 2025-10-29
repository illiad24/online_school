import BenefitsSection from '@/widgets/sections/BenefitsSection';
import ContactSection from '@/widgets/sections/ContactSection';
import FeaturedCourses from '@/widgets/sections/FeaturedCourses';
import MainSection from '@/widgets/sections/MainSection';
import WhySection from '@/widgets/sections/WhySection';
import { Box, Container } from '@mui/material';
function HomePage() {
    return (
        <Box  >
            <MainSection />
            <WhySection />
            <FeaturedCourses />
            <BenefitsSection />
            <ContactSection />
        </Box>
    );
}

export default HomePage;