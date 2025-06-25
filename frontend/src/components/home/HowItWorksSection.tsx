import { Card, CardContent } from '@/components/ui/card';
const HowItWorksSection = () => {
  return <section className="py-16 px-4 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center  px-3 py-1 rounded-full text-sm font-medium mb-4 bg-zinc-200 max-w-40 text-black ">
            ⚙️ How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            3 Simple Steps to Smarter Lead Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-[#0000cf] rounded-2xl">
            <CardContent className="p-8 text-left bg-[#0000cf] rounded-full">
              <div className="inline-block inline-block px-3 py-1 rounded-md text-sm font-medium mb-4 bg-[#edff81] text-black">
                Step 1
              </div>
              <div className="mb-6 flex justify-center">
                <img src="/images/step-1.jpg" alt="Teaching platform interface" className="w-full max-w-sm rounded-lg shadow-md" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Scan Your Website or Data</h3>
              <p className="mb-4 text-slate-50">
                Instantly Understand What Your Business Offers
              </p>
              <p className="text-sm text-slate-50 ">
                Just enter your website URL — and let our AI get to work. It instantly scans your web pages, emails, PDFs, CSVs, or product feeds to understand your business offerings and customer language.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none overflow-hidden bg-[#edff7e] rounded-2xl">
            <CardContent className="p-8 text-left ">
              <div className="inline-block text-white px-3 py-1 rounded-md text-sm font-medium mb-4 bg-[#010127]">
                Step 2
              </div>
              <div className="mb-6 flex justify-center">
                <img src="/images/step-2.jpg" alt="LeadReach AI conversation features" className="w-full max-w-sm rounded-lg shadow-md" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">AI Handles Inquiries Like a Human</h3>
              <p className="mb-4 text-slate-950 text-base font-normal">
                Real-Time, Human-Like Conversations — 24/7
              </p>
              <p className="text-sm text-slate-950 font-normal">
                It speaks naturally, understands context, and keeps conversations flowing across voice, chat, and messaging platforms.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
            <CardContent className="p-8 text-left bg-[#020231] rounded-2xl">
              <div className="inline-block inline-block px-3 py-1 rounded-md text-sm font-medium mb-4 bg-slate-50 text-black">
                Step 3
              </div>
              <div className="mb-6 flex justify-center">
                <img src="/images/step-3.jpg" alt="Multi-platform integration network" className="w-full max-w-sm rounded-lg shadow-md" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-50">Personalized Follow-Up Across Channels</h3>
              <p className="mb-4 text-slate-50">
                Smart, Automated Responses That Drive Conversions
              </p>
              <p className="text-sm text-slate-50">
                LeadReachAI automatically follows up with SMS, emails, or WhatsApp messages — all personalized based on the conversation and keeps leads warm.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;