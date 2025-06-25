import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PricingSection from '@/components/home/PricingSection';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Services
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Engage, Qualify, and Convert Leads — Automatically.
          </p>
        </div>
      </section>

     

      {/* AI Voice Agents Section */}
      <section className="py-16 px-4 bg-[#00003f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-0 p-10 bg-slate-50 rounded-3xl">

            <div className="rounded-2xl">
              <img
                src="/images/cta.png"
                alt="AI Voice Agents"
                className="w-sm h-auto rounded-lg"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                AI Voice Agents for Business Calls & Beyond
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Revolutionize how your business handles phone calls, messages, and follow-ups. Our AI voice agents take over repetitive, time-consuming tasks — so your team can focus on what really matters. Reduce support costs by over 50%, operate 24/7, and engage leads the moment they reach out.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground font-semibold">Reduce costs by over 50%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground font-semibold">Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples of Flows Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Examples of flows
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">SMS & WhatsApp Automation</h3>
                <p className="text-muted-foreground">
                  Engage your leads and customers where they already are — in their text inbox. LeadReachAI sends personalized follow-ups, reminders, and offers via SMS or WhatsApp based on real-time intent.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📧</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Email Follow-Up Campaigns</h3>
                <p className="text-muted-foreground">
                  Whether it's a lead capture form or a product inquiry, our AI sends context-aware follow-up emails that feel human — not templated — improving open rates and conversions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔗</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Website & CRM Integration</h3>
                <p className="text-muted-foreground">
                  From Shopify to Salesforce, Zendesk to WordPress — LeadReachAI plugs into your stack and instantly understands your data, so your AI agent knows what to say and when to say it.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Intent Detection & Lead Qualification</h3>
                <p className="text-muted-foreground">
                  LeadReachAI listens, learns, and responds based on what your customers say — scoring leads in real-time, segmenting them automatically, and syncing with your CRM.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Smart Reporting & Optimization</h3>
                <p className="text-muted-foreground">
                  Track every conversation, measure engagement, and understand what's working. Our platform gives you actionable insights to refine conversations and close more deals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Custom Flows & Campaigns</h3>
                <p className="text-muted-foreground">
                  Launch personalized call flows, appointment reminders, lead nurturing sequences, and more — tailored to your business goals, industries, and customer behavior.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

       {/* Pricing Section */}
       <PricingSection />

      {/* Seamless Connectivity Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Seamless Connectivity That Powers Smart Conversations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Performance Analytics</h3>
                <p className="text-muted-foreground">
                  Integrate with CRMs, calendars, and ERPs to automatically sync appointments, contact data, and operations — so your AI always knows who it's talking to and what matters.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Knowledge Base Access</h3>
                <p className="text-muted-foreground">
                  Put your help docs to work. LeadReachAI pulls answers directly from your existing support content to provide accurate, always-on responses across every channel.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔗</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Seamless Integrations</h3>
                <p className="text-muted-foreground">
                  Get full visibility into performance. Track conversations, sentiment, and conversion rates with detailed reporting that helps you improve and scale smarter.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💭</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-4">Sentiment Analysis</h3>
                <p className="text-muted-foreground">
                  Empathy at scale. Our AI doesn't just respond — it understands tone, urgency, and emotion to deliver more personalized, human-like customer experiences.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Central AI Brain */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-full w-48 h-48 mx-auto flex items-center justify-center mb-8">
              <div className="text-white text-6xl">🤖</div>
            </div>
            <p className="text-xl text-muted-foreground">AI Brain</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
