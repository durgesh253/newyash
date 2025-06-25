import { Card, CardContent } from '@/components/ui/card';
const TestimonialsSection = () => {
  const testimonials = [{
    name: "Sarah T.",
    role: "Marketing Manager",
    content: "Completely transformed how we engage with property leads. The AI is so lifelike that clients often think they're speaking to a human. We've seen a 3X increase in scheduled showings in just 30 days.",
    bgColor: "bg-slate-900",
    textColor: "text-white",
    avatar: "ST"
  }, {
    name: "Mark R.",
    role: "General Sales Manager",
    content: "We handle hundreds of inquiries every day — LeadReachAI gave us the ability to respond instantly, even after hours. Our sales team can now focus on closing, not chasing leads. It's a total game-changer.",
    bgColor: "bg-yellow-300",
    textColor: "text-slate-900",
    avatar: "MR"
  }, {
    name: "Emily Z.",
    role: "Director of Customer Experience",
    content: "From product questions to follow-ups and reviews, LeadReachAI handles it all. It saved us over 40 hours a week in manual support and helped boost repeat purchases by 25%.",
    bgColor: "bg-blue-600",
    textColor: "text-white",
    avatar: "EZ"
  }];
  return <section className="py-16 px-4 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            ⭐ Testimonial
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What our clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="bg-[000044] bg-[#000044] rounded-3xl">
              <CardContent className="p-8 rounded-3xl bg-[#021244]">
                <p className="text-base text-slate-50 my-[21px]">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                    <img src="/images/placeholder.png" alt="User Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-normal text-slate-50">{testimonial.name}</h4>
                    <p className="text-zinc-50">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;