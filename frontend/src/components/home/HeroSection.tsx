import DemoForm from '@/components/DemoForm';
import { Star, ArrowRight, CheckCircle, Play, Zap, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-24 md:pt-28 pb-2 px-4 text-white relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/20"></div>
      <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-32 md:w-48 h-32 md:h-48 bg-lime-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-lime-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col justify-center py-8 md:py-0">
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-4 md:space-y-6">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/40 rounded-full px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-blue-200 shadow-lg backdrop-blur-sm">
              <Zap className="w-3 md:w-4 h-3 md:h-4 text-lime-400" />
              AI-Powered Customer Support
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-lime-400 rounded-full animate-pulse"></div>
            </div>

            {/* Enhanced Main Heading */}
            <div className="space-y-2 md:space-y-4">
              <h4 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-yellow-400 to-orange-400 animate-gradient">
                  Best Agent
                </span>
              </h4>
              <div className="w-16 md:w-20 h-0.5 md:h-1 bg-gradient-to-r from-lime-400 to-yellow-400 rounded-full mx-auto lg:mx-0"></div>
            </div>

            {/* Enhanced Subtitle */}
            <div className="space-y-2 md:space-y-4">
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 leading-relaxed">
                Reach, Answer, & Follow — 24/7. 
              </p>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg text-lime-400 font-semibold">
                Talks Like a Human. Powered by Your Business Data.
              </p>
            </div>

            {/* Enhanced Features List */}
            <div className="space-y-2 md:space-y-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-lime-400 mb-2 md:mb-3">Why Choose LeadReachAI?</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3 group">
                  <div className="w-4 md:w-5 h-4 md:h-5 bg-lime-400/20 rounded-full flex items-center justify-center group-hover:bg-lime-400/40 transition-all duration-300">
                    <CheckCircle className="w-2 md:w-3 h-2 md:h-3 text-lime-400" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors">24/7 Automated Customer Support</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 group">
                  <div className="w-4 md:w-5 h-4 md:h-5 bg-lime-400/20 rounded-full flex items-center justify-center group-hover:bg-lime-400/40 transition-all duration-300">
                    <Users className="w-2 md:w-3 h-2 md:h-3 text-lime-400" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors">Multi-channel Integration</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 group">
                  <div className="w-4 md:w-5 h-4 md:h-5 bg-lime-400/20 rounded-full flex items-center justify-center group-hover:bg-lime-400/40 transition-all duration-300">
                    <Zap className="w-2 md:w-3 h-2 md:h-3 text-lime-400" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors">AI-Powered Lead Generation</span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 md:pt-4">
              <button className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-lime-400 to-yellow-400 text-black px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-xs md:text-sm hover:shadow-2xl hover:shadow-lime-400/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="w-3 md:w-4 h-3 md:h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group inline-flex items-center justify-center gap-2 border-2 border-gray-400 text-gray-300 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold text-xs md:text-sm hover:bg-white/10 hover:border-lime-400 transition-all duration-300 backdrop-blur-sm">
                <Play className="w-3 md:w-4 h-3 md:h-4" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Enhanced Right Content - Demo Form */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative bg-white/10 border border-white/20 rounded-2xl md:rounded-3xl p-2 md:p-3 shadow-2xl hover:shadow-lime-400/10 transition-all duration-500">
              <div className="absolute -top-1 md:-top-0.5 -right-1 md:-right-0.5 w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <DemoForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
