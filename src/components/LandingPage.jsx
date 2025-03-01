import CountUp from "react-countup";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight, ExternalLink, Clock, MapPin, Phone, Mail } from "lucide-react"
import Marquee from "./Marquee"


// Social media icon paths
const SOCIAL_ICON_PATHS = {
  default: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z",
  twitter:
    "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  instagram:
    "M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z",
  linkedin:
    "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M2 4a2 2 0 114 0 2 2 0 01-4 0z",
}

// Social media links
const socialLinks = {
  facebook: "https://www.facebook.com/share/165BY9PNhi/",
  instagram: "https://www.instagram.com/rif_mjpru?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  linkedin: "https://www.linkedin.com/company/rif-mjpru/",
  twitter: "https://x.com/mjp_bareilly",
}

// Main App Component
const FoundationLandingPage = () => {
  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <AchievementsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  )
}

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY
    const visible = prevScrollPos > currentScrollPos || currentScrollPos < 50

    setIsScrolled(currentScrollPos > 50)
    setIsVisible(visible)
    setPrevScrollPos(currentScrollPos)
  }, [prevScrollPos])

  useEffect(() => {
    setPrevScrollPos(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300   ${
        isScrolled ? "bg-white shadow-md py-1 border-b border-orange-100" : "bg-transparent py-2"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4  ">
        <div className="flex items-center justify-between py-1 border-b-2 border-gray-200 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-white-100 after:shadow-lg after:shadow-white-100 after:animate-pulse">
          {/* Logo */}
          <div className="h-12 flex items-center">
            <img src="/SAMAGAM-png.png" alt="Samagam Logo" className="h-16 object-contain" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 ">
            {["home", "about", "achievements", "gallery", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-orange-500 cursor-pointer  ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden transition-colors duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg border-t border-orange-100"
          >
            <div className="py-3 px-4">
              <div className="flex flex-col space-y-1">
                {["home", "about", "achievements", "gallery", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="flex items-center w-full text-left px-4 py-3 text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-md transition-colors duration-300"
                  >
                    <ChevronRight size={16} className="mr-2 text-orange-500" />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [
      {
        image: "/Samagam-h.png",
        title: "Empowering Communities",
        subtitle: "Building a better future through education and collaboration",
      },
      {
        image: "/mjp[1].jpg",
        title: "Creating Opportunities",
        subtitle: "Providing platforms for growth and development",
      },
      {
        image: "/pic4.jpg",
        title: "Fostering Innovation",
        subtitle: "Supporting ideas that change the world",
      },
    ]
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(interval)
    }, [])
  
    return (
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Image Slider with Ken Burns effect */}
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.2,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
            <img
              src={slide.image || "/placeholder.svg"}
              alt={`Foundation Background ${index + 1}`}
              className="absolute object-cover w-full h-full"
            />
          </motion.div>
        ))}
  
        {/* Hero Content */}
        <div className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-300 text-sm font-medium mb-4">
              Empowering Future Innovators
            </span>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 font-[Montserrat] tracking-tight">
              {slides[currentSlide].title}{" "}
              <motion.span
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text"
                animate={{
                  backgroundPosition: ["0%", "100%"],
                  opacity: [0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                Together
              </motion.span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {slides[currentSlide].subtitle}
            </motion.p>
          </motion.div>
  
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-full font-semibold text-lg tracking-wider transition-all duration-300 shadow-lg hover:shadow-orange-500/40"
            >
              Learn More
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg tracking-wider transition-all duration-300"
            >
              Get Involved
            </motion.button>
          </motion.div>
        </div>
  
        {/* Slide Indicators */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              className={`h-3 rounded-full transition-all duration-500 ${
                currentSlide === index ? "bg-gradient-to-r from-orange-400 to-orange-600 w-8" : "bg-white/50 w-3"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
  
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>
    )
  }
// About Section Component
const AboutSection = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0])
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 2])

  const organizations = [
    {
      title: "MJPRU University",
      description:
        "Mahatma Jyotiba Phule Rohilkhand University (MJPRU) is a major university in Uttar Pradesh, serving 5.5+ lakh students across nine districts. Established under the UP Universities Act, 1973, it oversees 587 colleges and offers diverse programs.",
      logo: "/latest.jpg",
      link: "https://www.mjpru.ac.in/",
    },
    {
      title: "RIF Incubation Center",
      description:
        "RIF is focussed to provide faster growth to new ventures, incubatees for successful commercialisation of technology/product through a combination of Accelerator Program, Alumni Connect, Corporate Market Access.",
      logo: "/rif.jpeg",
      link: "https://www.rifmjpru.com/",
    },
    
  ]

  return (
    <section id="about" className="py-24 min-h-screen bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div className="text-center mb-16" style={{ y, opacity }} transition={{ duration: 0.8 }}>
        <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
            Our Organization
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-orange-600">Us</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the organizations that make our foundation's work possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {organizations.map((org, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-orange-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-6 w-full h-32 flex items-center justify-center bg-orange-50 rounded-lg p-4">
                <img src={org.logo || "/placeholder.svg"} alt={`${org.title} logo`} className="h-full object-contain" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{org.title}</h3>
              <p className="text-gray-600 mb-6">{org.description}</p>
              <a
                href={org.link}
                className="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
                <ExternalLink className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


const AchievementsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const achievements = [
    { title: 4, suffix: "+ Years", description: "Of service and commitment to community development", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: 50, suffix: "+ Programs", description: "Successfully implemented across different regions", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { title: 100, suffix: "+ Registration", description: "Directly benefited from our initiatives", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { title: 100, suffix: "+ Partners", description: "Collaborated across various sectors", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { title: 20, suffix: "+ Awards", description: "Recognized for excellence and innovation", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { title: 50, suffix: " lakh+ Funding", description: "Raised for community development projects", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <section id="achievements" className="py-24 bg-orange-500 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setHasAnimated(true)}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-orange-100">Achievements</span>
          </h2>
          <p className="mt-4 text-xl text-orange-100/90 max-w-3xl mx-auto">
            Celebrating milestones that reflect our commitment and impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 transition-all duration-300 hover:bg-white/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mr-5">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={achievement.icon} />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {hasAnimated && (
                    <CountUp
                      start={0}
                      end={achievement.title}
                      duration={4}
                      separator=","
                      easingFn={(t, b, c, d) => c * (t /= d) * t + b} // Smooth ease-in effect
                    />
                  )}
                  {achievement.suffix}
                </h3>
              </div>
              <p className="text-orange-100/80">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
// Gallery Section Component
const GallerySection = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    {
      src: "/MJP_0794[1].jpg",
      caption: "Ideathon 2.o 2024",
      description: "Our flagship startup event bringing communities together.",
    },
    { src: "/mjp[1].jpg", caption: "Mahatma Jyotiba Phule Rohilkhand University (MJPRU)", description: "A leading university in Uttar Pradesh with 5.5+ lakh students." },
    {
      src: "/ptch2.jpg",
      caption: "Ptiching Competition 2023",
      description: "Promoting health and wellness in our community",
    },
    { src: "/RIF.jpg", caption: "Education Outreach Program", description: "Supporting educational development" },
    { src: "/pitch.jpg", caption: "Start-Up Project Competion", description: "Working towards a sustainable future" },
  ]

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
            Our Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Event <span className="text-orange-600">Gallery</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our events and initiatives that make a difference.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentImage * 100}%` }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {images.map((image, index) => (
                <div key={index} className="min-w-full relative">
                  <img
                    src={
                      image.src ||
                      '/placeholder.svg"} alt={image.caption} className                  <img src={image.src || "/placeholder.svg'
                    }
                    alt={image.caption}
                    className="w-full h-[500px] object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-${currentImage === index ? "100" : "0"} transition-opacity duration-500`}
                  />
                  {currentImage === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 p-8"
                    >
                      <h3 className="text-white text-2xl font-bold mb-2">{image.caption}</h3>
                      <p className="text-orange-100/90 text-lg">{image.description}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-orange-500 hover:text-white border border-white/30 text-white"
            aria-label="Previous image"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-orange-500 hover:text-white border border-white/30 text-white"
            aria-label="Next image"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`transition-all duration-300 ${
                  currentImage === index ? "bg-orange-600 w-8 h-3" : "bg-gray-300 w-3 h-3"
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
            Join Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Register Your <span className="text-orange-600">Startup</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join our innovative ecosystem and take your startup to the next level.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">
          <motion.div
            className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-600"></div>
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan to Register Your Startup</h3>
              <p className="text-gray-600 mb-8">
                Scan this QR code with your mobile device to access our registration form.
              </p>

              {/* QR Code Image */}
              <div className="bg-white p-4 rounded-lg shadow-md border border-orange-100 mb-6">
                <img src="/Qr_register.png" alt="Registration QR Code" width="200" height="200" className="mx-auto" />
              </div>

              <p className="text-sm text-gray-500 mb-2">Or use the direct link:</p>
              <a
                href="https://shorturl.at/pnNjN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Open Registration Form
              </a>

              <div className="mt-10 pt-6 border-t border-orange-100 w-full">
                <div className="flex flex-col items-center">
                  <h4 className="text-base font-medium text-gray-900 mb-4">What happens next?</h4>
                  <ol className="text-left space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mr-3 flex-shrink-0">
                        1
                      </span>
                      <span>Complete the registration form with your startup details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mr-3 flex-shrink-0">
                        2
                      </span>
                      <span>Upload your pitch deck document when prompted</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mr-3 flex-shrink-0">
                        3
                      </span>
                      <span>Our team will review your application within 5 business days</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-600"></div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">+91 8979794345</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@rifmjpru.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">Gate no.3 RIF Building, MJPRU</p>
                    <p className="text-gray-600">Uttar Pradesh, Bareilly</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-orange-100">
                <h4 className="text-base font-medium text-gray-900 mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  {Object.entries(socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center transition-all duration-300 shadow-md"
                      aria-label={`Visit our ${platform} page`}
                    >
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={SOCIAL_ICON_PATHS[platform] || SOCIAL_ICON_PATHS.default}
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-orange-100">
                <div className="bg-orange-50 p-6 rounded-xl">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0 mr-3" />
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Office Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  // Define quick links with URLs
  const quickLinks = [
    { name: "About Us", url: "#about" },
    { name: "About MJPRU", url: "https://mjpru.ac.in/overview.aspx" },
    { name: "About RIF", url: "https://www.rifmjpru.com/about" },
    { name: "Get Involved", url: "https://shorturl.at/pnNjN" },
    { name: "Contact", url: "#contact" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-12">
        {/* Orange wave separator */}
        <div className="relative -mt-20 mb-16">
          <svg className="w-full h-20 fill-current text-orange-500" preserveAspectRatio="none" viewBox="0 0 1440 74">
            <path d="M0,42.027c120,20,120,20,240,0s120-20,240,0,120,20,240,0,120-20,240,0,120,20,240,0,120-20,240,0v32H0V42.027z"></path>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <img src="/SAMAGAM-png.png" alt="Foundation Logo" className="h-16 w-auto mb-6" />
            <p className="text-gray-400 max-w-md mb-8">
              Our foundation is dedicated to empowering communities and creating opportunities for growth and
              development through education, innovation, and collaboration.
            </p>
            <div className="flex space-x-4">
              {Object.entries(socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-orange-600/20 hover:bg-orange-600 flex items-center justify-center transition-colors duration-300"
                  aria-label={`Visit our ${platform} page`}
                >
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={SOCIAL_ICON_PATHS[platform] || SOCIAL_ICON_PATHS.default}
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : "_self"} // Open external links in new tab
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-orange-500" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Visit Us</h3>
            <div className="text-gray-400 space-y-4">
              <p>
                <span className="text-orange-500 font-medium">Address:</span><br />
                Rohilkhand Innovation Foundation,<br />
                MJPRU Campus, Bareilly,<br />
                Uttar Pradesh, India
              </p>
              <p>
                <span className="text-orange-500 font-medium">Email:</span><br />
                info@rifmjpru.com
              </p>
              <p>
                <span className="text-orange-500 font-medium">Office Hours:</span><br />
                Monday - Friday: 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Foundation. All rights reserved.
          </p>
        </div>

        {/* Developer Credits - Made uneditable by moving outside the CMS-editable component */}
        <div className="text-center mt-8 pt-4 border-t border-gray-800" data-uneditable="true">
          <p className="text-sm text-gray-500">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/gauravkumar-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-500 transition-colors duration-300"
            >
              Gaurav Kumar
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FoundationLandingPage
