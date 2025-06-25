import { Button } from '@/components/ui/button';
import { scrollToTop } from '@/lib/utils';

const CTASection = () => {
  return <section className="px-4 bg-[#edff81] py-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between my-0 py-[48px]">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 max-w-2xl leading-tight">
              Ready to <span className="underline decoration-4 underline-offset-8">See AI</span> in Action?
            </h2>
            <p className="text-lg text-slate-800 mb-2 max-w-xl">
              Submit your website and phone number to experience the magic of LeadReachAI. Your site will be
            </p>
            <p className="text-lg text-slate-800 mb-6 max-w-xl">
              scanned, an AI agent will engage, and you'll receive a follow-up message —
            </p>
            <p className="text-lg font-bold text-slate-900 mb-8">
              all in under 5 minutes.
            </p>
            <Button 
              onClick={scrollToTop}
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 py-4 text-lg font-medium"
            >
              Start My Free Demo
              <span className="ml-2">→</span>
            </Button>
          </div>
          
          <div className="flex-1 flex justify-end">
            <img src="/images/cta.png" alt="Ready to See AI in Action" className="w-full max-w-md h-auto rounded-2xl" />
          </div>
        </div>
      </div>
    </section>;
};

export default CTASection;