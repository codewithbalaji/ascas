import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { ServicesSection } from "./ServicesSection";
import { HighlightsSection } from "./HighlightsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ContactSection } from "./ContactSection";

export function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HighlightsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}