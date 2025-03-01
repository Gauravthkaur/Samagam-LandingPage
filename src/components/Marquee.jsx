import React from "react";
import Marquee from "react-fast-marquee";

const PartnersMarqueeWithLibrary = () => {
  const partners = [
    { id: 1, name: "RIF", logo: "/rif.jpeg" },
    { id: 2, name: "MJPRU", logo: "/latest.jpg" },
    { id: 3, name: "ISO Certified", logo: "/iso.jpg" },
    { id: 4, name: "NGO Darpan", logo: "/NGO Darpan[1].jpg" },
    { id: 5, name: "MSME", logo: "/msme.png" },
    { id: 6, name: "Startup India", logo: "/startin up.jpg" },
    { id: 7, name: "Gov Initiative", logo: "/startup india.png" }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-orange-50 py-20">
      <div className="container mx-auto text-center mb-12">
        <div className="inline-block mb-6">
          <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">Trusted Partnerships</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Our <span className="text-orange-500">Partners</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Collaborating with industry leaders to deliver excellence
        </p>
        <div className="w-32 h-1.5 bg-orange-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 mb-10">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <Marquee 
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-4"
        >
          {partners.map((partner) => (
            <div key={partner.id} className="mx-6">
              <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-32 w-48 border border-orange-100 transition-all duration-300 hover:shadow-orange-200 hover:border-orange-300 hover:-translate-y-1">
                <div className="relative group">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-20 w-auto object-contain  group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute -bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {partner.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
      
    </div>
  );
};

export default PartnersMarqueeWithLibrary;