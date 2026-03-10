import slide1 from '../assets/image/farmer3.jpg';

const Carousel = () => {
  return (
    <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden">
      <img
        src={slide1}
        alt="KisanHaat - Farm Fresh Marketplace"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/40 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Kisan<span className="text-green-300">Haat</span>
          </h1>
          <p className="text-white/70 mt-2 text-xs sm:text-sm md:text-base">Farm Fresh, Direct Deals</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
