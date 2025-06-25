import { Card, CardContent } from '@/components/ui/card';

const BlogSection = () => {
  const articles = [
    {
      title: "A step-by-step guide to implementing financial SaaS solutions",
      category: "SaaS",
      date: "January 30, 2025",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      categoryColor: "bg-green-500 text-white"
    },
    {
      title: "Top 5 ways financial SaaS helps improve cash flow management",
      category: "Finance",
      date: "January 28, 2025", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
      categoryColor: "bg-yellow-400 text-slate-900"
    },
    {
      title: "Why CFOs are investing in financial SaaS platforms for strategic growth",
      category: "Business",
      date: "January 25, 2025",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      categoryColor: "bg-yellow-600 text-white"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            📚 Articles
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Insights & Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group bg-white rounded-xl overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden p-8">
              {/* image */}
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 rounded-xl"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`${article.categoryColor} px-3 py-1 rounded-full text-xs font-medium`}>
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-xs font-medium">
                    {article.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;