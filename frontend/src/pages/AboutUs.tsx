import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaLinkedinIn } from "react-icons/fa";
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-10">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Born in India. Raise in Spain. Growing in the{' '}
                <span className="text-[#edff81]">USA.</span>
              </h1>
              <p className="text-xl text-blue-200 mb-8">
                We're revolutionizing how businesses connect with their ideal customers through
                the power of artificial intelligence and data-driven insights.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/about-1.jpg"
                alt="Team working with code"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="relative">
              <img
                src="/images/about.jpg"
                alt="Analytics dashboard"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div>
              <div className="inline-block text-sm font-medium text-muted-foreground mb-4 bg-white px-3 py-1 rounded-full">
                ⭐ Our mission
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Empowering your future Customer Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our Technology was born in India, with a key focus on voice AI. Our marketing team
                was raised in Spain, and now we combined forces to grow into the USA. We are our
                current clients succeed and use the feedback to build a powerful product.
              </p>
              <p className="text-lg text-muted-foreground">
                We are rooted in innovation and global collaboration, our mission is to empower
                businesses with AI-driven lead engagement that feels personal, timely, and
                effective. We blend technical excellence with deep marketing insight to create
                seamless conversations that convert—no matter the channel, industry, or market.
                more than a platform—it's your smart, scalable partner for growth.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously push the boundaries of what's possible with AI and machine learning
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-green-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in open communication and honest relationships with our clients
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-purple-600 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in every interaction and deliver exceptional results
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-medium text-muted-foreground mb-4 bg-white px-3 py-1 rounded-full">
              ⭐ Our Team
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our dedicated team of experts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <Card className="border-none bg-[#edff81]">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ignacio Delgado</h3>
                    <p className="text-sm text-gray-700 mb-4">Co-Founder</p>
                    <p className="text-sm text-gray-700 mb-4">
                      Marketing veteran with 27+ years driving $1.3B+ in sales. Expert in AI, eCommerce, and automotive growth.
                    </p>
                    <div className="text-[#0000cf]">< FaLinkedinIn size={30} /> </div>
                  </div>
                  <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0">
                    <img src="/images/ignacio-delgado.jpg" alt="Ignacio Delgado" className="w-full h-full rounded-lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-[#0000cf] text-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Kapil Maheshwari</h3>
                    <p className="text-sm opacity-90 mb-4">Co-Founder</p>
                    <p className="text-sm opacity-90 mb-4">
                      Kapil Build AI voice agent for staffing industry & other similar industry which help to replace human with AI voice for screening & automation work
                    </p>
                    <div className="text-white">< FaLinkedinIn size={30} /></div>
                  </div>
                  <div className="w-20 h-20 bg-white/20 rounded-lg flex-shrink-0">
                    <img src="/images/kapil-maheshwari.jpg" alt="Kapil Maheshwari" className="w-full h-full rounded-lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white border-2 border-sky-700">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Jignesh Chaudhari</h3>
                    <p className="text-sm text-gray-600 mb-4">Senior Software Engineer</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Jignesh builds scalable backend and web solutions for startups and businesses, helping them automate operations and launch faster with reliable, high-performance tech.
                    </p>
                    <div className="text-black"> < FaLinkedinIn size={30} /></div>
                  </div>


                  <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0">
                    <img src="/images/jignesh-chaudhari.jpg" alt="Jignesh Chaudhari" className="w-full h-full rounded-lg" />

                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-[#010127] text-white border-2 border-sky-700">
              <CardContent className="p-8 ">
                <div className="flex items-start gap-4 ">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Durgesh Jadhav</h3>
                    <p className="text-sm text-white mb-4">Full-Stack developer</p>
                    <p className="text-sm text-white mb-4">
                      Durgesh builds mobile apps with Flutter and SwiftUI, helping startups and businesses turn ideas into real apps — fast, affordable, and scalable.
                    </p>
                    <div className="text-white"> < FaLinkedinIn size={30} /></div>
                  </div>


                  <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0">
                    <img src="/images/durgesh-jadhav.jpg" alt="Durgesh Jadhav" className="w-full h-full rounded-lg" />

                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-[#c9c8c8] text-black border-2 border-indigo-600">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Yash Bhadrike</h3>
                    <p className="text-sm opacity-90 mb-4">UI/UX design</p>
                    <p className="text-sm opacity-90 mb-4">
                      Yash designs creative UI/UX and web experiences for startups and brands, helping them stand out with stunning visuals and user-friendly designs. Build AI voice agent for staffing industry & other similar industry which help to replace human with AI voice for screening & automation work
                    </p>
                    <a href="https://in.linkedin.com/in/yash-bhadrike-bb194b1b5" className="text-black">< FaLinkedinIn size={30} /></a>
                  </div>
                  <div className="w-20 h-20 bg-white/20 rounded-lg flex-shrink-0">
                    <img src="/images/yash-bhadrike.jpg" alt="Yash Bhadrike" className="w-full h-full rounded-lg" />
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Our Impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50M+</div>
              <div className="text-muted-foreground">Leads Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses generating more leads with LeadReachAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Trial
            </Button>
            {/* <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-blue-600">
              Book a Demo
            </Button> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
