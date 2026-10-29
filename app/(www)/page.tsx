import {HeroSection} from "@/components/hero-section";
import {FeaturesSection} from "@/components/features-section";
import {StatsSection} from "@/components/www/stats-section";
import {DepartmentsSection} from "@/components/www/departments-section";

export default function Home() {
    return (
        <>
            <HeroSection />
            <DepartmentsSection />
            <FeaturesSection />
            <StatsSection />
        </>
    )
}