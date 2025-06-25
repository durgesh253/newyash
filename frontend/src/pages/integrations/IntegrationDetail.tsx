import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const IntegrationDetail = () => {
  const { platform } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  const integrationData: { [key: string]: any } = {
    shopify: {
      name: "Shopify",
      logo: "/images/shopify.png",
      intro: "Shopify is the go-to platform for building, managing, and scaling online stores. With LeadReachAI, you supercharge your Shopify store by adding smart, conversational AI that engages visitors, answers product questions, and follows up via SMS, email, or WhatsApp — all in real-time.",
      aboutIntegration: "LeadReachAI's integration with Shopify helps online stores increase conversions, save time, and improve customer satisfaction. Once connected, our AI scans product data, order history, and customer behavior to drive tailored conversations across multiple channels.",
      keyBenefits: [
        "Auto-reply to product and shipping queries",
        "Recover abandoned carts via SMS, email, or WhatsApp",
        "Send personalized product recommendations",
        "Trigger follow-ups based on customer actions",
        "Sync with tools like Klaviyo or Mailchimp for campaign automation"
      ],
      description: "Whether you're a solo seller or managing a large storefront, LeadReachAI works behind the scenes to engage every lead, so you never miss a sale.",
      category: "E-commerce",
      status: "Available",
      setupSteps: [
        {
          title: "Connect Your Shopify Store",
          description: "From your LeadReachAI dashboard, select Shopify and authorize access to your store securely."
        },
        {
          title: "Choose AI Behavior",
          description: "Set how your AI handles FAQs, cart recovery, and product support."
        },
        {
          title: "Customize Responses",
          description: "Tailor the AI tone and messages to match your brand voice."
        },
        {
          title: "Test & Activate",
          description: "Send test messages or simulate common customer actions to confirm everything works smoothly."
        },
        {
          title: "Start Selling Smarter",
          description: "Let your AI take the lead — helping, converting, and following up with your customers automatically."
        }
      ]
    },
    salesforce: {
      name: "Salesforce",
      logo: "/images/salesforce.png",
      intro: "Salesforce is the world's leading CRM platform for managing customer relationships and sales processes. With LeadReachAI, you enhance your Salesforce system with intelligent AI that engages prospects, qualifies leads, and automates follow-ups across multiple channels.",
      aboutIntegration: "LeadReachAI's integration with Salesforce transforms your CRM into a proactive lead generation machine. Our AI reads your contact data, understands past interactions, and responds to inquiries in real-time while keeping your pipeline updated.",
      keyBenefits: [
        "Automatically qualify and score leads",
        "Sync conversations directly to contact records",
        "Trigger automated follow-up sequences",
        "Update deal stages based on AI interactions",
        "Integrate with Marketing Cloud for omnichannel campaigns"
      ],
      description: "From small sales teams to enterprise organizations, LeadReachAI ensures no lead falls through the cracks while your sales team focuses on closing deals.",
      category: "CRM & Sales",
      status: "Available",
      setupSteps: [
        {
          title: "Connect Your Salesforce Org",
          description: "Authenticate your Salesforce organization through our secure OAuth integration."
        },
        {
          title: "Map Your Fields",
          description: "Configure which Salesforce fields should sync with AI conversation data."
        },
        {
          title: "Set Lead Qualification Rules",
          description: "Define criteria for how AI should score and route qualified leads."
        },
        {
          title: "Test Integration",
          description: "Run test scenarios to ensure data flows correctly between systems."
        },
        {
          title: "Launch Your AI Sales Assistant",
          description: "Activate AI-powered lead engagement while maintaining full CRM visibility."
        }
      ]
    },
    zendesk: {
      name: "Zendesk",
      logo: "/images/zendesk.png",
      intro: "Zendesk is a leading customer service platform that helps businesses provide better support experiences. With LeadReachAI, you enhance your Zendesk system with AI that understands your knowledge base and responds to customer inquiries instantly.",
      aboutIntegration: "LeadReachAI's integration with Zendesk revolutionizes customer support by providing instant, accurate responses based on your existing help articles and ticket history. Our AI learns from your support team's best practices to deliver consistent, high-quality assistance.",
      keyBenefits: [
        "Instantly resolve common support queries",
        "Reduce ticket volume by 60-80%",
        "Provide 24/7 multilingual support",
        "Escalate complex issues to human agents",
        "Sync with your existing knowledge base"
      ],
      description: "Whether you're a growing startup or an enterprise with thousands of daily tickets, LeadReachAI helps you scale support without scaling costs.",
      category: "Support & Help Desk",
      status: "Available",
      setupSteps: [
        {
          title: "Connect Your Zendesk Account",
          description: "Securely link your Zendesk instance through our API integration."
        },
        {
          title: "Import Knowledge Base",
          description: "Allow AI to learn from your existing help articles and FAQs."
        },
        {
          title: "Configure Escalation Rules",
          description: "Set when AI should hand off complex issues to human agents."
        },
        {
          title: "Test AI Responses",
          description: "Validate AI answers against your support standards."
        },
        {
          title: "Deploy Smart Support",
          description: "Launch AI-powered support that learns and improves over time."
        }
      ]
    },
    hubspot: {
      name: "HubSpot",
      logo: "/images/hubspot.png",
      intro: "HubSpot is an all-in-one marketing, sales, and service platform that helps businesses grow. With LeadReachAI, you supercharge your HubSpot CRM with intelligent AI that engages leads, nurtures prospects, and converts visitors into customers automatically.",
      aboutIntegration: "LeadReachAI's integration with HubSpot creates a seamless flow between AI conversations and your marketing automation. Our AI understands your contact properties, deal stages, and marketing campaigns to deliver personalized experiences at scale.",
      keyBenefits: [
        "Qualify leads automatically using AI conversations",
        "Sync contact data and conversation history",
        "Trigger marketing workflows based on AI interactions",
        "Score leads based on engagement quality",
        "Connect with HubSpot's email and social tools"
      ],
      description: "From solo entrepreneurs to marketing teams at scale, LeadReachAI integrates seamlessly with your HubSpot ecosystem to maximize lead conversion and customer growth.",
      category: "CRM & Sales",
      status: "Available",
      setupSteps: [
        {
          title: "Connect Your HubSpot Portal",
          description: "Authorize LeadReachAI to access your HubSpot account securely."
        },
        {
          title: "Map Contact Properties",
          description: "Configure which HubSpot fields should be populated by AI conversations."
        },
        {
          title: "Set Up Lead Scoring",
          description: "Define how AI interactions should influence your lead scoring model."
        },
        {
          title: "Configure Workflows",
          description: "Set up automated sequences triggered by AI conversation events."
        },
        {
          title: "Launch Intelligent Lead Generation",
          description: "Activate AI-powered lead qualification with full HubSpot integration."
        }
      ]
    },
    whatsapp: {
      name: "WhatsApp",
      logo: "/images/whatsapp.png",
      intro: "WhatsApp is the world's most popular messaging platform with over 2 billion users. With LeadReachAI, you transform WhatsApp into a powerful business communication channel that engages customers, answers questions, and drives sales through intelligent AI conversations.",
      aboutIntegration: "LeadReachAI's WhatsApp integration enables businesses to provide instant, personalized customer service and sales support through the platform customers already use daily. Our AI handles inquiries, qualifies leads, and maintains conversations across the entire customer journey.",
      keyBenefits: [
        "Achieve 98% message open rates",
        "Provide instant customer support 24/7",
        "Send rich media including images and documents",
        "Handle multiple conversations simultaneously",
        "Integrate with your existing business systems"
      ],
      description: "Whether you're a local business or a global brand, WhatsApp with LeadReachAI helps you connect with customers in the most personal and effective way possible.",
      category: "Communication",
      status: "Available",
      setupSteps: [
        {
          title: "Verify Your Business",
          description: "Complete WhatsApp Business verification to access messaging APIs."
        },
        {
          title: "Connect to LeadReachAI",
          description: "Link your WhatsApp Business account through our secure integration."
        },
        {
          title: "Design Conversation Flows",
          description: "Create AI conversation paths for different business scenarios."
        },
        {
          title: "Test Message Templates",
          description: "Validate your AI responses and rich media content."
        },
        {
          title: "Go Live with WhatsApp AI",
          description: "Start engaging customers with intelligent WhatsApp conversations."
        }
      ]
    },
    "facebook-messenger": {
      name: "Facebook Messenger",
      logo: "/images/facebook-m.png",
      intro: "Facebook Messenger connects billions of people worldwide and provides businesses with direct access to customers. With LeadReachAI, you transform your Facebook page into an intelligent customer service and sales hub that engages visitors automatically.",
      aboutIntegration: "LeadReachAI's Messenger integration turns your Facebook presence into a proactive business tool. Our AI engages page visitors, answers product questions, and guides prospects through your sales funnel while you focus on growing your business.",
      keyBenefits: [
        "Engage Facebook page visitors instantly",
        "Automate customer service on social media",
        "Generate leads directly from Facebook",
        "Provide rich, interactive conversation experiences",
        "Maintain brand consistency across all interactions"
      ],
      description: "From small businesses to major brands, Facebook Messenger with LeadReachAI helps you capitalize on social media traffic and convert followers into customers.",
      category: "Communication",
      status: "Available",
      setupSteps: [
        {
          title: "Connect Your Facebook Page",
          description: "Link your business Facebook page to LeadReachAI through Facebook's API."
        },
        {
          title: "Configure AI Personality",
          description: "Set your AI's tone and personality to match your brand voice."
        },
        {
          title: "Set Up Welcome Messages",
          description: "Create engaging opening messages for new conversations."
        },
        {
          title: "Test User Interactions",
          description: "Validate conversation flows and response accuracy."
        },
        {
          title: "Activate Social AI Assistant",
          description: "Launch intelligent customer engagement on your Facebook page."
        }
      ]
    },
    wordpress: {
      name: "WordPress",
      logo: "/images/wordpress.png",
      intro: "WordPress powers over 40% of all websites on the internet, from blogs to complex business sites. With LeadReachAI, you transform any WordPress site into an intelligent lead generation machine that engages visitors and converts them into customers.",
      aboutIntegration: "LeadReachAI's WordPress integration seamlessly adds conversational AI to your website without any coding required. Our AI understands your content, engages visitors based on their behavior, and captures leads through natural conversations.",
      keyBenefits: [
        "Easy plugin installation with no coding required",
        "AI learns from your website content automatically",
        "Reduce bounce rates and increase engagement",
        "Capture leads through conversational forms",
        "Integrate with popular WordPress plugins and themes"
      ],
      description: "Whether you run a business website, blog, or e-commerce store, LeadReachAI makes your WordPress site work harder to generate and qualify leads around the clock.",
      category: "Website & CMS",
      status: "Available",
      setupSteps: [
        {
          title: "Install LeadReachAI Plugin",
          description: "Download and install our WordPress plugin from your dashboard."
        },
        {
          title: "Configure AI Settings",
          description: "Set up your AI's behavior and appearance on your website."
        },
        {
          title: "Train on Your Content",
          description: "Allow AI to learn from your pages, posts, and product information."
        },
        {
          title: "Customize Appearance",
          description: "Match the AI widget design to your website's branding."
        },
        {
          title: "Launch Website AI",
          description: "Activate intelligent visitor engagement on your WordPress site."
        }
      ]
    },
    woocommerce: {
      name: "WooCommerce",
      logo: "/lovable-uploads/7c313e25-4c89-4aad-82d5-f792b7063062.png",
      intro: "WooCommerce is the world's most popular e-commerce platform, powering millions of online stores. With LeadReachAI, you enhance your WooCommerce store with intelligent AI that answers product questions, assists with orders, and recovers abandoned carts automatically.",
      aboutIntegration: "LeadReachAI's WooCommerce integration transforms your online store into a smart shopping assistant. Our AI understands your product catalog, inventory levels, and customer behavior to provide personalized shopping experiences that drive sales.",
      keyBenefits: [
        "Answer product questions instantly",
        "Recover abandoned carts automatically",
        "Provide personalized product recommendations",
        "Assist with order tracking and support",
        "Sync with inventory and pricing in real-time"
      ],
      description: "From small online shops to large e-commerce operations, WooCommerce with LeadReachAI helps you provide Amazon-level customer service while increasing conversion rates and average order values.",
      category: "E-commerce",
      status: "Available",
      setupSteps: [
        {
          title: "Install WooCommerce Plugin",
          description: "Add the LeadReachAI plugin to your WooCommerce store."
        },
        {
          title: "Sync Product Catalog",
          description: "Allow AI to learn about your products, pricing, and inventory."
        },
        {
          title: "Configure Shopping Assistant",
          description: "Set up AI responses for common e-commerce scenarios."
        },
        {
          title: "Test Purchase Flow",
          description: "Validate AI assistance throughout the customer journey."
        },
        {
          title: "Launch Smart Store",
          description: "Activate AI-powered shopping assistance for all customers."
        }
      ]
    },
    tiktok: {
      name: "TikTok",
      logo: "/images/tiktok.png",
      intro: "TikTok is the fastest-growing social media platform with over 1 billion active users worldwide. With LeadReachAI, you transform viral TikTok content into real business opportunities by engaging viewers and converting them into qualified leads.",
      aboutIntegration: "LeadReachAI's TikTok integration helps businesses capitalize on social media engagement by connecting with viewers through intelligent conversations. Our AI engages users who interact with your content and guides them through your sales funnel.",
      keyBenefits: [
        "Convert viral content views into leads",
        "Engage with younger demographic effectively",
        "Automate responses to comments and DMs",
        "Track engagement and lead generation metrics",
        "Scale personal interaction with AI assistance"
      ],
      description: "Whether you're an influencer, brand, or business looking to leverage TikTok's massive reach, LeadReachAI helps you turn social media engagement into tangible business results.",
      category: "Social Media",
      status: "Available",
      setupSteps: [
        {
          title: "Connect TikTok Business Account",
          description: "Link your TikTok Business account to LeadReachAI platform."
        },
        {
          title: "Set Up Engagement Rules",
          description: "Configure how AI should respond to comments and messages."
        },
        {
          title: "Create Lead Capture Flows",
          description: "Design conversation paths to qualify and capture leads."
        },
        {
          title: "Test Social Interactions",
          description: "Validate AI responses across different engagement scenarios."
        },
        {
          title: "Activate Social Lead Generation",
          description: "Launch AI-powered lead capture from your TikTok content."
        }
      ]
    }
  };

  const data = integrationData[platform || ''];

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Integration not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {data.name} + LeadReachAI
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {data.intro}
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">About the Integration</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {data.aboutIntegration}
              </p>
              
              <div className="mb-6">
                <h4 className="text-xl font-bold text-foreground mb-4">Key benefits:</h4>
                <ul className="space-y-3">
                  {data.keyBenefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>
        );
      case 'setup':
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">How to Set Up</h2>
            
            <div className="space-y-8">
              {data.setupSteps.map((step: any, index: number) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Support & Resources</h2>
            <p className="text-muted-foreground text-lg mb-12">
              We're here to help every step of the way.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">📘 Step-by-Step Guides</h3>
                  <p className="text-muted-foreground mb-4">
                    Full setup instructions and video walkthroughs.
                  </p>
                  <Button variant="outline" className="w-full">
                    View Guides
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">🧑‍💻 Integration Experts</h3>
                  <p className="text-muted-foreground mb-4">
                    Our team can help customize your {data.name}-AI experience.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Experts
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">📞 24/7 Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Get live help anytime via chat, email, or phone.
                  </p>
                  <Button variant="outline" className="w-full">
                    Get Support
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">📚 Knowledge Base</h3>
                  <p className="text-muted-foreground mb-4">
                    FAQs, use cases, and advanced configuration tips.
                  </p>
                  <Button variant="outline" className="w-full">
                    Browse Articles
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">🔒 Secure & Compliant</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade encryption and GDPR-ready data practices ensure your {data.name} integration is secure and compliant.
                </p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-[95px]">
        <div className="max-w-4xl mx-auto text-center my-[54px]">
          
          {/* Integration Icons */}
          <div className="mb-12 flex justify-center">
            <div className="bg-[#edff81]  rounded-2xl p-6 flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2">
                <img src={data.logo} alt={`${data.name} Logo`} className="w-full h-full object-contain" />
              </div>
              <div className="text-2xl font-bold text-slate-800">+</div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {data.name} integration
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
            {data.intro}
          </p>

          {/* Tab Navigation - Fixed styling */}
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => setActiveTab('about')} 
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'about' 
                  ? 'bg-white text-slate-900 shadow-lg' 
                  : 'bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => setActiveTab('setup')} 
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'setup' 
                  ? 'bg-white text-slate-900 shadow-lg' 
                  : 'bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50'
              }`}
            >
              How to setup
            </button>
            <button 
              onClick={() => setActiveTab('support')} 
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'support' 
                  ? 'bg-white text-slate-900 shadow-lg' 
                  : 'bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50'
              }`}
            >
              Support
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 px-4">
        {renderTabContent()}
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to integrate {data.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using LeadReachAI with {data.name}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-blue-900">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IntegrationDetail;
