import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { scrollToTop } from '@/lib/utils';
  
  const FAQSection = () => {
    const faqs = [
      {
        question: "What is LeadReachAI?",
        answer: "LeadReachAI is an AI-powered lead engagement platform that combines voice, SMS, email, and chat capabilities. It helps businesses automate lead follow-up, qualify prospects, and schedule appointments — all while maintaining a natural, human-like conversation flow."
      },
      {
        question: "How does it work?",
        answer: "1. Submit your website URL or data source, 2. Our AI scans and learns about your business, 3. Choose your preferred channels (voice, SMS, email, chat), 4. AI starts engaging with leads in real-time, 5. Get instant notifications and analytics."
      },
      {
        question: "Does it integrate with my existing tools?",
        answer: "Yes! Supported tools include: CRMs: HubSpot, Salesforce, Zoho; Messaging: WhatsApp, SMS, Email, Facebook Messenger; Support: Zendesk, Intercom, Freshdesk; E-commerce: Shopify, WooCommerce. And more integrations are added monthly."
      },
      {
        question: "How is pricing calculated?",
        answer: "Pricing is based on monthly interactions (calls, messages, follow-ups): 5,000 interactions – $1,000/month ($0.20 per interaction), 10,000 interactions – $1,800/month ($0.18 per interaction). Annual plans receive 20% off."
      },
      {
        question: "What makes LeadReachAI different?",
        answer: "It's more than a chatbot. LeadReachAI combines voice-enabled AI, lead nurturing, and ad syncing. The AI: Handles real-time calls and chats, Detects intent and sentiment, Sends tailored SMS/emails, Syncs with CRMs and triggers ad campaigns, Offers real-time analytics dashboards."
      },
      {
        question: "Who is it for?",
        answer: "Best suited for: E-commerce stores, Real estate agencies, Automotive dealerships, SaaS and healthcare companies."
      },
      {
        question: "Can I try it before I buy?",
        answer: "Yes. Submit your website URL and phone number to experience a live AI demo. It will scan your site, simulate a call, and send a follow-up within 5 minutes."
      },
      {
        question: "Is it compliant with TCPA, GDPR, and other regulations?",
        answer: "Yes. Features include: Consent popups, Clear opt-in/out workflows, Full TCPA/GDPR compliance, Encrypted uploads and access."
      },
      {
        question: "What happens after a demo number is submitted?",
        answer: "The AI runs a 5-minute demo based on your data, then sends an SMS or email summary with insights and sentiment analysis."
      }
    ];
  
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              ❓ FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
              Common Questions
            </h2>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
  
            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index + Math.ceil(faqs.length / 2)}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
  
          <div className="text-center">
            <Button 
              onClick={scrollToTop}
              className="bg-[#edff81] text-blue-600 hover:bg-[#d9e665] rounded-full px-8 py-6 text-lg font-medium"
            >
              Start Your Free Trial Now
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQSection;