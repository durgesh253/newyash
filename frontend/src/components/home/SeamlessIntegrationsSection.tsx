import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { scrollToTop } from '@/lib/utils';

const SeamlessIntegrationsSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation when section comes into view
            gsap.to(grid.querySelectorAll(".icon"), {
              opacity: 1,
              scale: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out"
            });
            
            // Stop observing after animation starts
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before section is fully in view
      }
    );

    // Start observing the section
    observer.observe(section);

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-12 grid grid-cols-1 lg:grid-cols-2">

          <div className="flex-1">
            <div className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
              🔗 Seamless Integrations
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 max-w-md">
              LeadReachAI connects effortlessly to the tools your team already uses.
            </h2>
            
            <Button 
              onClick={scrollToTop}
              className="text-blue-600 rounded-full px-6 py-3 font-medium bg-[#edff7e]"
            >
              View all integrations
              <span className="ml-2">→</span>
            </Button>
          </div>
          
          <div className="flex-1">
            <div 
              ref={gridRef}
              className="grid grid-cols-4 gap-5 justify-center items-center"
              style={{
                gridTemplateColumns: 'repeat(4, 80px)',
                gridGap: '20px'
              }}
            >
              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/zendesk.png" alt="Zendesk" className="w-10 h-10 object-contain" />
              </div>
              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/shopify.png" alt="Shopify" className="w-10 h-10 object-contain" />
              </div>
              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/freshdesk.png" alt="Freshdesk" className="w-10 h-10 object-contain" />
              </div>
              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/salesforce.png" alt="Salesforce" className="w-10 h-10 object-contain" />
              </div>

              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/whatsapp.png" alt="WhatsApp" className="w-10 h-10 object-contain" />
              </div>
              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/wordpress.png" alt="WordPress" className="w-10 h-10 object-contain" />
              </div>
              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/hubspot.png" alt="HubSpot" className="w-10 h-10 object-contain" />
              </div>
              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/woocommerce.png" alt="WooCommerce" className="w-10 h-10 object-contain" />
              </div>

              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/facebook-m.png" alt="Messenger" className="w-10 h-10 object-contain" />
              </div>
              <div className="icon w-20 h-20 bg-white rounded-2xl shadow-lg flex justify-center items-center opacity-0 scale-75 transition-all duration-400 ease-in-out">
                <img src="/images/tiktok.png" alt="TikTok" className="w-10 h-10 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeamlessIntegrationsSection;