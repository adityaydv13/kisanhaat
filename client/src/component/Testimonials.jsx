const testimonials = [
  {
    name: 'Batuk Dev',
    role: 'Farmer, Uttar Pradesh',
    initials: 'BD',
    quote: 'KisanHaat helped me sell my crops directly to contractors at 30% better prices. The platform is simple and I can manage everything from my phone.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Organic Farmer, Gujarat',
    initials: 'SJ',
    quote: 'As an organic farmer, finding the right buyers was always a challenge. KisanHaat connected me with premium contractors who value quality produce.',
    rating: 5,
  },
  {
    name: 'Raj Desai',
    role: 'Rice Farmer, Punjab',
    initials: 'RD',
    quote: 'The bidding system is transparent and fair. I received multiple bids for my rice harvest and chose the best deal. Truly revolutionary for farmers.',
    rating: 4,
  },
  {
    name: 'Priya Sharma',
    role: 'Contractor, Maharashtra',
    initials: 'PS',
    quote: 'As a contractor, I can browse through hundreds of listings and place bids directly. The machinery rental feature is an added bonus for seasonal needs.',
    rating: 5,
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Farmers Across India
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Hear from our community of farmers and contractors who have transformed their business with KisanHaat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="card-hover p-6 sm:p-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StarRating rating={t.rating} />
              <p className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-[15px]">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-11 h-11 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
