import React from 'react';
// Note: You'll need to install this library with:
// npm install react-fast-marquee
// or
// yarn add react-fast-marquee
import Marquee from 'react-fast-marquee';

const PartnersMarqueeWithLibrary = () => {
  // Example partner logos
  const partners = [
    { id: 1, name: "RIF", logo: "/rif.jpeg" },
    { id: 2, name: "MJPRU", logo: "/latest.jpg" },
    { id: 3, name: "Partner 3", logo: "/iso.jpg" },
    { id: 4, name: "Partner 4", logo: "/NGO Darpan[1].jpg" },
    { id: 5, name: "Partner 5", logo: "/msme.png" },
    { id: 6, name: "Partner 6", logo: "/startin up.jpg" },
    { id: 7, name: "Partner 7", logo: "/startup india.png" }
  ];
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Partners</h2>
        <p className="text-center text-gray-600 mb-8">Trusted by industry leaders worldwide</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <Marquee 
          gradient={true}
          gradientWidth={100}
          speed={100}
          pauseOnHover={true}
        >
          {partners.map(partner => (
            <div key={partner.id} className="mx-8">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-16 w-auto hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default PartnersMarqueeWithLibrary;