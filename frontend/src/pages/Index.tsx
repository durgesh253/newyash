import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import KeyFeaturesSection from '@/components/home/KeyFeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import SeamlessIntegrationsSection from '@/components/home/SeamlessIntegrationsSection';
import BlogSection from '@/components/home/BlogSection';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/home/FAQSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <IndustriesSection />
      <PricingSection />
      <SeamlessIntegrationsSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
