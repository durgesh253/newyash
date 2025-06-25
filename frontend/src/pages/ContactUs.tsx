import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';

// 6LeXO2orAAAAABoOA5_qrYrKr5w0FHDD6UwiA4hk



const ContactUs = () => {

  const [capVal, setCapVal] = useState(null)

  return <div className="min-h-screen bg-background">
    <Navigation />

    {/* Hero Section */}
    <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 my-[43px]">
          We'd love to hear from you
        </h1>
      </div>
    </section>

    {/* Contact Cards Section */}
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border border-gray-200 bg-[#0000cf]">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#edff81]">
                <span className="text-2xl text-slate-950">✉</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-50">Send a message</h3>
              <p className="text-slate-50">hello@leadreachai.com</p>
            </CardContent>
          </Card>

          <Card className="bg-[#edff81] border border-gray-200 ">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#0000cf]">
                <span className="text-white text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Working together? Call now.</h3>
              <p className="text-black text-base font-extrabold">+1 (267) 588-5540</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#010127]">
                <span className="text-white text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">Work location</h3>
              <p className="text-muted-foreground text-sm">
                Sensor We LLC,4023 Kennett Pike<br />
                #50762 Wilmington, DE 19807
              </p>
            </CardContent>
          </Card>
        </div> */}

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Have a question?</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Input placeholder="Last name" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Input type="email" placeholder="Email address" className="mt-1" />
                </div>

                <div>
                  <Textarea placeholder="Enter your message" className="mt-1 min-h-[120px]" />
                </div>

                <div>
                  <ReCAPTCHA sitekey="6LcRPGorAAAAAN6tK4m_33t_zVmTsgWSaiuCAgzb" onChange={(val) => setCapVal(val)} />
                </div>

                <Button className="w-full bg-[#edff81] text-black hover:bg-[#d9e665]" disabled={!capVal}>
                  Send to Learn More
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map placeholder */}
          <div className="bg-gray-100 rounded-lg flex items-center justify-center h-full min-h-[400px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.1625120589315!2d-75.60184132483234!3d39.78090819409349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6fc364b65f9fb%3A0x1dda10cdcf2523b!2s4023%20Kennett%20Pike%2C%20Wilmington%2C%20DE%2019807%2C%20USA!5e0!3m2!1sen!2sin!4v1750240011449!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            />
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>;
};
export default ContactUs;