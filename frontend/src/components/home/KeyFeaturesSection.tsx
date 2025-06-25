import { Card, CardContent } from '@/components/ui/card';
import { Globe, MessageCircle, Zap, Users, TrendingUp, Star } from 'lucide-react';
const KeyFeaturesSection = () => {
  return <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center text-black px-3 py-1 rounded-full text-sm font-medium mb-4 bg-zinc-100">
            ⚡ Key Features of LeadReachAI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful AI, Built for Conversion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-auto bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/images/key-features-1.png" alt="Omnichannel Support" className="w-60 h-auto " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Omnichannel Support</h3>
              <p className="text-muted-foreground text-sm">
                Connect with your leads via SMS, WhatsApp, phone, email, and Facebook Messenger.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/images/key-features-2.png" alt="Real-Time Voice & Chat AI" className="w-60 h-auto " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Voice & Chat AI</h3>
              <p className="text-muted-foreground text-sm">
                Answer questions instantly with human-sounding, multilingual AI agents.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/images/key-features-3.png" alt="Smart Data Scanning" className="w-60 h-auto " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Data Scanning</h3>
              <p className="text-muted-foreground text-sm">
                Scan websites, PDFs, emails, CRMs, support docs, and more to fuel AI responses.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/images/key-features-4.png" alt="Customizable Voices" className="w-60 h-auto " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customizable Voices</h3>
              <p className="text-muted-foreground text-sm">
                Choose gender, accent, and language to match your audience perfectly.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/images/key-features-5.png" alt="Effortless Integrations" className="w-60 h-auto " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Effortless Integrations</h3>
              <p className="text-muted-foreground text-sm">
                Plug into Shopify, HubSpot, Salesforce, Zendesk, and dozens more.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/images/key-features-6.png" alt="Sentiment Analysis & Learning" className="w-60 h-auto " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sentiment Analysis & Learning</h3>
              <p className="text-muted-foreground text-sm">
                Understand how leads feel, learn from every interaction, and optimize outcomes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default KeyFeaturesSection;