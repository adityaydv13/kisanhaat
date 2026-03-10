import Vegetables from '../assets/image/Vegetables.png';
import Pulses from '../assets/image/Pulses.png';
import Rice1 from '../assets/image/Rice1.png';
import Fruits from "../assets/image/Fruits.png";

const categories = [
  { name: 'Vegetables', image: Vegetables, desc: 'Fresh seasonal vegetables from local farms' },
  { name: 'Pulses', image: Pulses, desc: 'High-quality pulses harvested fresh' },
  { name: 'Rice', image: Rice1, desc: 'Premium quality rice varieties' },
  { name: 'Fresh Fruits', image: Fruits, desc: 'Farm-fresh fruits picked at peak ripeness' },
];

function FarmerSell() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Would You Like to Sell?</h2>
          <p className="text-gray-500 mt-2">Choose from fresh produce categories below</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((item, i) => (
            <div
              key={item.name}
              className="group card-hover overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative h-36 md:h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{item.name}</h3>
                <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FarmerSell;
