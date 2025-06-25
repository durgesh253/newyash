import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
const IndustriesSection = () => {
  return <section className="py-16 px-4 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for Every Industry
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored solutions that understand your unique business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/integrations/services">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer rounded-2xl">
              <CardContent className="p-6 text-center bg-[#0111d1] rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img src="/images/industry-1.png" alt="Services" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-50">Services</h3>
                <p className="text-sm text-zinc-100">Professional services and consulting</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/integrations/ecommerce">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer rounded-2xl">
              <CardContent className="p-6 text-center bg-[edff81] rounded-2xl bg-[#edff81]">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img src="/images/industry-2.png" alt="E-commerce" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold mb-2">E-commerce</h3>
                <p className="text-muted-foreground text-sm">Online retail and marketplace</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/integrations/medical">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer rounded-2xl">
              <CardContent className="p-6 text-center bg-[#021244] rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img src="/images/industry-3.png" alt="Medical" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-50">Medical</h3>
                <p className="text-sm text-slate-50">Healthcare and medical practices</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/integrations/real-estate">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img src="/images/industry-4.png" alt="Real Estate" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real Estate</h3>
                <p className="text-muted-foreground text-sm">Property sales and management</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>;
};
export default IndustriesSection;