import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
const Integrations = () => {
  const integrationCategories = [{
    title: "CRM & Sales",
    description: "Connect with your existing CRM to sync leads and customer data",
    integrations: [{
      name: "HubSpot",
      logo: "/lovable-uploads/196b0b2c-1b8b-4805-9937-95912f3842ae.png",
      status: "Available"
    }, {
      name: "Salesforce",
      logo: "/lovable-uploads/05d51fef-3acb-4609-b295-413009d61b19.png",
      status: "Available"
    }, {
      name: "Pipedrive",
      logo: "/lovable-uploads/ae5663cd-ec0b-4b44-a33d-3fac502136e6.png",
      status: "Available"
    }, {
      name: "Zoho CRM",
      logo: "/lovable-uploads/6a14fee1-3400-4ae9-88aa-da85c640f787.png",
      status: "Coming Soon"
    }]
  }, {
    title: "Communication",
    description: "Integrate with messaging and communication platforms",
    integrations: [{
      name: "WhatsApp",
      logo: "/lovable-uploads/65d4c34b-83c0-4b4e-8b9d-0048bc50dfce.png",
      status: "Available"
    }, {
      name: "Telegram",
      logo: "/lovable-uploads/d1720d46-56a3-4bc6-b8f3-7f7be6cfc10d.png",
      status: "Available"
    }, {
      name: "SMS",
      logo: "/lovable-uploads/1c0f3f83-17a9-46a4-bf88-ddeacb08eb1c.png",
      status: "Available"
    }, {
      name: "Slack",
      logo: "/lovable-uploads/1e7ea4a7-5f29-4435-9111-0182171067d1.png",
      status: "Coming Soon"
    }]
  }, {
    title: "E-commerce",
    description: "Sync with your online store and product data",
    integrations: [{
      name: "Shopify",
      logo: "/lovable-uploads/26e3ef85-379e-4254-9fb2-3148d0a1f3b3.png",
      status: "Available"
    }, {
      name: "WooCommerce",
      logo: "/lovable-uploads/4524137d-e7a7-4755-83e7-3c445de5471c.png",
      status: "Available"
    }, {
      name: "Magento",
      logo: "/lovable-uploads/68331bf7-2c27-4f0f-a36d-39aa0b2051c6.png",
      status: "Coming Soon"
    }, {
      name: "BigCommerce",
      logo: "/lovable-uploads/684a3128-9baf-4afe-a7c5-34c76a615972.png",
      status: "Coming Soon"
    }]
  }, {
    title: "Support & Help Desk",
    description: "Connect with customer support and ticketing systems",
    integrations: [{
      name: "Zendesk",
      logo: "/lovable-uploads/68a3d9c0-5359-40b5-afef-6f3943d32e5e.png",
      status: "Available"
    }, {
      name: "Intercom",
      logo: "/lovable-uploads/74cedcde-85af-466b-9a40-831e188e7293.png",
      status: "Available"
    }, {
      name: "Freshdesk",
      logo: "/lovable-uploads/76e2dedd-af91-4aa0-99e5-996eedbbcbac.png",
      status: "Coming Soon"
    }, {
      name: "Help Scout",
      logo: "/lovable-uploads/78b3bfac-b2d2-4518-8635-7383c07b038b.png",
      status: "Coming Soon"
    }]
  }, {
    title: "Marketing & Analytics",
    description: "Track performance and sync with marketing tools",
    integrations: [{
      name: "Google Analytics",
      logo: "/lovable-uploads/8890320d-44c5-436f-bc50-847c6c0b3ada.png",
      status: "Available"
    }, {
      name: "Facebook Pixel",
      logo: "/lovable-uploads/9238476e-38f3-43fe-87f7-ee963d5a1eb0.png",
      status: "Available"
    }, {
      name: "Mailchimp",
      logo: "/lovable-uploads/a07ff23c-5d1b-496a-af41-55bebf9b19f8.png",
      status: "Coming Soon"
    }, {
      name: "Google Ads",
      logo: "/lovable-uploads/b8c574e7-828d-4439-b3fd-6b3d577120cf.png",
      status: "Coming Soon"
    }]
  }, {
    title: "Automation & Webhooks",
    description: "Automate workflows and connect with any service",
    integrations: [{
      name: "Zapier",
      logo: "/lovable-uploads/bb4eadc8-6266-4976-b0f3-b71cbdb33b0e.png",
      status: "Available"
    }, {
      name: "Make (Integromat)",
      logo: "/lovable-uploads/c19b7f9b-4a9c-4ff0-ae46-d42927f54972.png",
      status: "Available"
    }, {
      name: "Webhooks",
      logo: "/lovable-uploads/cc9eb7a6-1a23-4766-8efe-1b20a67aec1d.png",
      status: "Available"
    }, {
      name: "IFTTT",
      logo: "/lovable-uploads/e07e17ec-eda8-4b51-b025-dbbb6910c435.png",
      status: "Coming Soon"
    }]
  }];
  return <div className="min-h-screen bg-background">
    <Navigation />

    {/* Hero Section */}
    <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="max-w-4xl mx-auto text-center my-[40px]">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Connect LeadReachAI with your favorite tools
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          Integrate with 200+ popular tools and platforms to streamline your workflow.
          Sync data, automate processes, and enhance your lead generation capabilities.
        </p>
        {/* <Button size="lg" variant="secondary" className="text-lg px-8">
          Browse All Integrations
        </Button> */}
      </div>
    </section>

    {/* Seamless Integrations Section */}
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-slate-700 text-white px-3 py-1 rounded-full text-sm font-medium mb-6">
          🔗 Seamless Integrations
        </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Integrate AI with the most popular platforms
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{
            name: "Shopify",
            logo: "/images/shopify.png",
            description: "Automate product inquiries, order updates, and follow-ups directly from your Shopify store with AI-powered conversations.",
            slug: "shopify"
          }, {
            name: "Salesforce",
            logo: "/images/salesforce.png",
            description: "Sync leads and automate CRM follow-ups using AI-driven conversations inside Salesforce.",
            slug: "salesforce"
          }, {
            name: "Zendesk",
            logo: "/images/zendesk.png",
            description: "Speed up customer support by automating responses to common Zendesk tickets using AI.",
            slug: "zendesk"
          }, {
            name: "HubSpot",
            logo: "/images/hubspot.png",
            description: "Streamline your sales process with AI-powered lead nurturing and automated follow-ups in HubSpot.",
            slug: "hubspot"
          }, {
            name: "WhatsApp",
            logo: "/images/whatsapp.png",
            description: "Send personalized AI messages on WhatsApp and respond to customer queries automatically.",
            slug: "whatsapp"
          }, {
            name: "Facebook Messenger",
            logo: "/images/facebook-m.png",
            description: "Add AI to Messenger and start answering customer questions instantly on your Facebook page.",
            slug: "facebook-messenger"
          }, {
            name: "WordPress",
            logo: "/images/wordpress.png",
            description: "Add AI to your WordPress site to engage visitors and automate lead capture.",
            slug: "wordpress"
          }, {
            name: "WooCommerce",
            logo: "/images/woocommerce.png",
            description: "Handle product questions and order updates automatically on your WooCommerce store.",
            slug: "woocommerce"
          }, {
            name: "TikTok",
            logo: "/images/tiktok.png",
            description: "Turn TikTok views into real leads with AI-powered follow-up and engagement.",
            slug: "tiktok"
          }].map((integration, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
            <CardContent className="p-6 text-center h-full flex flex-col">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img src={integration.logo} alt={`${integration.name} Logo`} className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {integration.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-4">
                {integration.description}
              </p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = `/integrations/${integration.slug}`}>
                View Details
              </Button>
            </CardContent>
          </Card>)}
        </div>
      </div>
    </section>

    {/* Integration Categories */}


    {/* Custom Integration Section */}


    {/* Features Section */}
    {/* <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Integrations?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Setup</h3>
              <p className="text-muted-foreground">
                Connect your tools in minutes with our one-click integration setup.
                No technical knowledge required.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Real-time Sync</h3>
              <p className="text-muted-foreground">
                Keep your data synchronized across all platforms in real-time.
                Never miss an important lead or update.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with 99.9% uptime. Your data is safe
                and always accessible when you need it.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section> */}

    {/* CTA Section */}
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Connect Your Tools?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Start integrating LeadReachAI with your existing workflow today
        </p>
        <Button size="lg" variant="secondary" className="text-lg px-8">
          Get Started Now
        </Button>
      </div>
    </section>

    <Footer />
  </div>;
};
export default Integrations;