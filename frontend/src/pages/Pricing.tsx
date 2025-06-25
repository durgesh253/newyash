import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQSection from '@/components/home/FAQSection';
import PricingSection from '@/components/home/PricingSection';
import { Button } from '@/components/ui/button';
const Pricing = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center my-[50px]">
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose the plan that fits your needs
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            We believe in offering simple, transparent, and affordable pricing plans to suit every need. Ultrices elit purus aenean facilisis urna. Erat interdum amet ultricies eget dignissim quis.
          </p>
        </div>
      </section>

      <PricingSection />

      <FAQSection />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses generating more leads with LeadReachAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Trial
            </Button>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Pricing;