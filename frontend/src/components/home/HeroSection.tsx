import DemoForm from '@/components/DemoForm';
import { Star } from 'lucide-react';

const HeroSection = () => {
  return (

    <section className="pt-20 pb-16 px-4 text-white relative overflow-hidden hero-gradient">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/20"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 my-[45px]">
          <div className="text-center items-center">
            <h1 className="text-5xl md:text-5xl font-bold mb-6">
              Discover Your <span className="text-[#edff81]"> Best Agent. </span>
            </h1>

            <p className="text-white mb-6 text-3xl">
              Reach, Answer, & Follow — 24/7.
            </p>

            <img
              src="/images/cta.png"
              alt="Customer Avatars"
              className="mx-auto h-80"
            />

            <p className="text-gray-300 mb-6">
              Talks Like a Human. Powered by Your Business Data.
            </p>
          </div>

          <DemoForm />
        </div>

        {/* Integrated Channels Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#edff81]">
            Trusted, Seamless AI Integration — Across Every Channel.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
            <div className="flex flex-col items-center">
              <img src="/images/fd.png" alt="Channel Logo" className="w-35 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/fm.png" alt="Channel Logo" className="w-35 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/tt.png" alt="Channel Logo" className="w-35 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/wh.png" alt="Channel Logo" className="w-35 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/woo.png" alt="Channel Logo" className="w-35 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/wpo.png" alt="Channel Logo" className="w-35 h-12 mb-2" />
            </div>
          </div>

          <h3 className="text-3xl font-bold mb-8">
            Trusted Through Thousands of Inquiries
          </h3>

          <div className="flex justify-center items-center mb-6">
            <img src="/images/customer.png" alt="Customer Avatars" className="h-16" />
          </div>

          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
          </div>

          <p className="text-xl">
            Over <span className="text-yellow-400 font-bold">10,000 +</span> Inquiries Resolved Using LeadReachAI System
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
