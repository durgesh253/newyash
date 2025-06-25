import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import './PricingSection.css';
import { scrollToTop } from '@/lib/utils';

const PricingSection = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  const getPlans = () => {
    if (isAnnually) {
      return [{
        name: "Starter plan",
        price: "$9600 (save 2400) USD",
        period: "/ year",
        interactions: "5,000 interactions/month",
        description: "Approx. 1,000 inquiries, 4 follow-up messages each",
        features: ["Real-time AI call, SMS, WhatsApp & email support", "1,000 active contacts/month", "Lifelike voice agent (1 language/accent)", "Basic analytics dashboard", "CRM & website integration", "Email + chat support"],
        bgColor: "bg-white/20",
        textColor: "text-white",
        buttonStyle: "bg-white text-slate-800 hover:bg-gray-100",
        interactionsBg: "bg-white/10"
      }, {
        name: "Growth plan",
        price: "$17280 (save 4320) USD",
        period: "/ year",
        interactions: "10,000 interactions/month",
        description: "Approx. 2,000 inquiries, 4 follow-ups per lead",
        features: ["Includes everything in Starter, plus:", "Up to 3,000 contacts/month", "Multi-language voice AI", "Advanced insights & sentiment analysis", "Priority email support", "Integration with Shopify, HubSpot, Zendesk, FB Messenger"],
        bgColor: "bg-[#0000cf]",
        textColor: "text-white",
        buttonStyle: "bg-white text-[#0000cf] hover:bg-gray-100",
        popular: true,
        interactionsBg: "bg-[#0000a0]"
      }, {
        name: "Enterprise plan",
        price: "Flexible Pricing for Enterprise",
        period: "",
        interactions: "Custom interactions/month",
        description: "Tailored to your sales & support team's needs",
        features: ["Includes everything in Growth, plus:", "Unlimited contacts & interactions", "Dedicated account manager", "AI behavior customization (tone, voice, style)", "24/7 priority support", "White-label options for agencies", "API access & webhook integrations"],
        bgColor: "bg-[#edff81]",
        textColor: "text-black",
        buttonStyle: "bg-black text-white hover:bg-gray-800",
        interactionsBg: "bg-[#d9e665]"
      }];
    } else {
      return [{
        name: "Starter plan",
        price: "$1000 USD",
        period: "/ month",
        interactions: "5,000 interactions/month",
        description: "Approx. 1,000 inquiries, 4 follow-up messages each",
        features: ["Real-time AI call, SMS, WhatsApp & email support", "1,000 active contacts/month", "Lifelike voice agent (1 language/accent)", "Basic analytics dashboard", "CRM & website integration", "Email + chat support"],
        bgColor: "bg-white/20",
        textColor: "text-white",
        buttonStyle: "bg-white text-slate-800 hover:bg-gray-100",
        interactionsBg: "bg-white/10"
      }, {
        name: "Growth plan",
        price: "$1800 USD",
        period: "/ month",
        interactions: "10,000 interactions/month",
        description: "Approx. 2,000 inquiries, 4 follow-ups per lead",
        features: ["Includes everything in Starter, plus:", "Up to 3,000 contacts/month", "Multi-language voice AI", "Advanced insights & sentiment analysis", "Priority email support", "Integration with Shopify, HubSpot, Zendesk, FB Messenger"],
        bgColor: "bg-[#0000cf]",
        textColor: "text-white",
        buttonStyle: "bg-white text-[#0000cf] hover:bg-gray-100",
        popular: true,
        interactionsBg: "bg-[#0000a0]"
      }, {
        name: "Enterprise plan",
        price: "Flexible Pricing for Enterprise",
        period: "",
        interactions: "Custom interactions/month",
        description: "Tailored to your sales & support team's needs",
        features: ["Includes everything in Growth, plus:", "Unlimited contacts & interactions", "Dedicated account manager", "AI behavior customization (tone, voice, style)", "24/7 priority support", "White-label options for agencies", "API access & webhook integrations"],
        bgColor: "bg-[#edff81]",
        textColor: "text-black",
        buttonStyle: "bg-black text-white hover:bg-gray-800",
        interactionsBg: "bg-[#d9e665]"
      }];
    }
  };
  const plans = getPlans();
  return <section className="py-16 px-4 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 bg-[#001a6d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-slate-700 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            ⭐ Simple, Scalable Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Tailor your choice to your goals
          </h2>
          
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium transition-colors ${!isAnnually ? 'text-white' : 'text-gray-400'}`}>
                Monthly
              </span>
              <button
                className={`custom-toggle ${isAnnually ? 'checked' : ''}`}
                onClick={() => setIsAnnually((v) => !v)}
                aria-pressed={isAnnually}
                type="button"
              >
                <span className="toggle-thumb" />
              </button>
              <span className={`text-sm font-medium transition-colors ${isAnnually ? 'text-white' : 'text-gray-400'}`}>
                Annually
              </span>
              {isAnnually && <div className="text-red-600 px-3 py-1 rounded-full text-xs font-medium bg-red-100 ml-2">
                  Save 20%
                </div>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => <Card key={index} className={`rounded-3xl ${plan.bgColor} relative flex flex-col h-full`}>
              {plan.popular && <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>}
              
              <CardHeader className="text-left pb-6 flex-grow">
                <h3 className={`${plan.textColor} font-semibold`}>{plan.name}</h3>
                <div className="mb-4">
                  <span className={`${plan.textColor} text-3xl font-semibold`}>{plan.price}</span>
                  <span className={`${plan.textColor} opacity-80 ml-1`}>{plan.period}</span>
                </div>
                <div className={`${plan.interactionsBg || 'bg-[#edff81]'} rounded-lg mb-3`}>
                  <p className={`${plan.textColor} py-[11px] text-lg px-[10px] font-semibold`}>{plan.interactions}</p>
                </div>
                <p className={`${plan.textColor} opacity-80 text-sm mb-6`}>{plan.description}</p>
                
                <div className="mb-6">
                  <h4 className={`${plan.textColor} font-semibold mb-3`}>Includes:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => <li key={featureIndex} className={`${plan.textColor} text-sm leading-relaxed`}>
                        {feature}
                      </li>)}
                  </ul>
                </div>
              </CardHeader>

              <CardContent className="pt-0 mt-auto">
                <Button 
                  onClick={scrollToTop}
                  className={`w-full rounded-full font-medium ${plan.buttonStyle}`} 
                  size="lg"
                >
                  {plan.name === "Enterprise plan" ? "Contact Us" : "Get started"}
                </Button>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};

export default PricingSection;