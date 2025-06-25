import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQSection from '@/components/home/FAQSection';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 py-[157px] hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 py-[55px]">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked{' '}
            <span className="text-[#edff81]">
              Questions
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Find answers to common questions about LeadReachAI
          </p>
        </div>
      </section>

      <FAQSection />
      
      <Footer />
    </div>
  );
};

export default FAQ;