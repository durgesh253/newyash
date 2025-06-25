import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import KeyFeaturesSection from '@/components/home/KeyFeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const Features = () => {
  // src/components/Signup.jsx
  function Signup() {
    return <div>Signup Page</div>;
  }

  return <div className="min-h-screen bg-background">
    <Navigation />

    {/* Hero Section */}
    <section className="pt-24 pb-16 px-4 py-[157px] hero-gradient text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/20"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10 py-[55px]">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Innovative AI, Built for Your{' '}
          <span className="text-[#edff81]">
            Success.
          </span>
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          Discover the unique features of this technology
        </p>
        <Button size="lg" className="text-lg px-8 bg-[#edff81] text-black hover:bg-[#edff81]/90">
          Start Free Trial
        </Button>
      </div>
    </section>

    <KeyFeaturesSection />
    <TestimonialsSection />

    {/* Experience AI Data Handling */}
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-foreground">
              Experience How AI Handles your Data
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your data powers intelligent action. Our AI doesn't just automate messaging—it learns from your
              customer interactions, CRM inputs, and lead behavior to uncover meaningful insights. These
              insights fuel smarter conversations, targeted follow-ups that move leads forward. With real-time
              dashboards and performance tracking, you gain a clear view of every touchpoint—so you can
              optimize, adapt, and grow with confidence.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Evaluate customization options</h3>
                  <p className="text-muted-foreground">
                    We connect and configure the system where it matters the most to your case
                    and channels
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Assessing Your Results</h3>
                  <p className="text-muted-foreground">
                    We believe managing your customer's journey should be simple. That's why we
                    built a platform that helps you understand the thinking behind every interaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <img
              src="/lovable-uploads/a7856f4b-bd1f-4d8c-b715-dad9332206cc.png"
              alt="Team collaboration in modern office"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Advanced Features */}
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Capabilities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Next-level features that set us apart from traditional lead generation tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
              <p className="text-muted-foreground">
                Forecast lead behavior and identify the best times to engage for maximum conversion rates
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Intent Monitoring</h3>
              <p className="text-muted-foreground">
                Track buyer intent signals across the web to identify prospects actively researching solutions
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Dynamic Personalization</h3>
              <p className="text-muted-foreground">
                Automatically customize messages and content based on individual lead profiles and preferences
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Multi-Channel Orchestration</h3>
              <p className="text-muted-foreground">
                Coordinate outreach across email, social media, and phone calls for consistent messaging
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Compliance Management</h3>
              <p className="text-muted-foreground">
                Ensure GDPR, CCPA, and other regulatory compliance with built-in privacy controls
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4">API & Webhooks</h3>
              <p className="text-muted-foreground">
                Integrate with any tool using our robust API and real-time webhook notifications
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Experience These Features?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of businesses already using LeadReachAI to transform their lead generation
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Start Free Trial
          </Button>

        </div>
      </div>
    </section>

    <FAQSection />

    <Footer />
  </div>;
};
export default Features;