import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://agristack.gov.in/assets/videos/home_bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-medium">Empowering Indian Farmers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-up" style={{ animationDelay: "100ms" }}>
            Kisan<span className="text-green-400">Haat</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
            Removing the middleman and enabling farmers to sell their crops at the best price. Direct farm-to-buyer marketplace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Link
              to="/login"
              className="btn-primary px-8 py-3.5 text-sm shadow-lg shadow-green-500/25 hover:shadow-green-500/40 no-underline"
            >
              Get Started
            </Link>
            <Link
              to="/faq"
              className="btn-base px-8 py-3.5 text-sm bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/25 focus-visible:ring-white/50 no-underline"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { value: "1000+", label: "Farmers" },
              { value: "500+", label: "Contractors" },
              { value: "5000+", label: "Deals" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center animate-fade-up" style={{ animationDelay: `${400 + i * 100}ms` }}>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
