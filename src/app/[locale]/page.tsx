'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  MapPin, ArrowRight, Car, Bus, Package, Map, Smartphone, 
  ShieldCheck, Menu, X, ChevronRight, Truck
} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

// --- Brand Assets ---
const BrandName = () => (
  <span className="text-2xl font-black tracking-tighter text-cyan-600">
    Wiyaak<span className="text-orange-500">.</span>
  </span>
);

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.1 } }
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center border-b border-gray-100"
    >
      <div className="flex items-center gap-10">
        <Link href="/"><BrandName /></Link>
        <div className="hidden md:flex gap-8 text-sm font-bold text-gray-600">
          {['Ride', 'Drive', 'Business', 'About'].map((item) => (
            <Link key={item} href="#" className="hover:text-cyan-600 transition relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden md:flex gap-4 items-center">
        <button className="text-sm font-bold text-gray-700 hover:text-cyan-600">Log in</button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-cyan-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-cyan-400 shadow-lg shadow-cyan-500/30 transition"
        >
          Sign up
        </motion.button>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      {/* Mobile Menu Overlay omitted for brevity, but would go here */}
    </motion.nav>
  );
};

const HeroWidget = () => {
  const [activeTab, setActiveTab] = useState<'ride' | 'courier'>('ride');

  const tabVariants = {
    inactive: { color: '#9ca3af', borderBottomColor: 'transparent' },
    active: { color: '#0891b2', borderBottomColor: '#0891b2' } // cyan-600
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,145,178,0.15)] max-w-md w-full relative z-10 border border-gray-50"
    >
      <div className="flex gap-4 mb-6">
        {['ride', 'courier'].map((tab) => (
          <motion.button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            variants={tabVariants}
            initial="inactive"
            animate={activeTab === tab ? 'active' : 'inactive'}
            className="flex-1 flex flex-col items-center gap-3 pb-3 border-b-4 font-bold transition-colors"
          >
            {tab === 'ride' ? <Car size={24} /> : <Package size={24} />}
            <span className="text-sm capitalize">{tab}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-black tracking-tight mb-4 text-gray-900">
            {activeTab === 'ride' ? 'Where to next?' : 'Send it swiftly.'}
          </h2>
          <div className="relative space-y-3">
            {/* Input Deco */}
            <div className="absolute left-4 top-4 flex flex-col items-center h-full">
              <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-sm"></div>
              <div className="w-0.5 flex-grow bg-gray-200 my-1"></div>
              <div className="w-3 h-3 border-2 border-orange-500 rounded-sm"></div>
            </div>
            
            <input 
              type="text" 
              placeholder="Pickup location" 
              className="w-full bg-gray-50 p-4 pl-12 rounded-2xl font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
            />
            <input 
              type="text" 
              placeholder="Dropoff location" 
              className="w-full bg-gray-50 p-4 pl-12 rounded-2xl font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
              "w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition flex justify-center items-center gap-2",
              activeTab === 'ride' ? "bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/30" : "bg-orange-500 hover:bg-orange-400 shadow-orange-500/30"
            )}
          >
            {activeTab === 'ride' ? 'Find a ride' : 'Confirm Send'} <ChevronRight />
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const ServiceCard = ({ icon: Icon, title, desc, img, color }: { icon: any, title: string, desc: string, img: string, color: string }) => {
  const colorClasses = {
    cyan: "hover:border-cyan-400 hover:shadow-cyan-200/50 icon-cyan",
    orange: "hover:border-orange-400 hover:shadow-orange-200/50 icon-orange",
    purple: "hover:border-purple-400 hover:shadow-purple-200/50 icon-purple",
    green: "hover:border-emerald-400 hover:shadow-emerald-200/50 icon-green",
  };

  const iconColor = {
    cyan: "text-cyan-500",
    orange: "text-orange-500",
    purple: "text-purple-500",
    green: "text-emerald-500",
  };

  return (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -10, scale: 1.02 }}
    className={clsx(
      "bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row h-auto md:h-72 cursor-pointer group border-2 border-transparent shadow-xl shadow-gray-200/40 transition-all duration-300",
      colorClasses[color as keyof typeof colorClasses]
    )}
  >
    <div className="p-8 flex flex-col justify-between w-full md:w-1/2 z-10 bg-white/90 backdrop-blur-sm md:bg-transparent">
      <div>
        <div className={clsx("p-3 bg-gray-50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform", iconColor[color as keyof typeof iconColor])}>
            <Icon size={32} />
        </div>
        <h3 className="text-2xl font-black mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed font-medium">{desc}</p>
      </div>
      <div className={clsx("flex items-center gap-2 font-bold mt-6 group-hover:gap-4 transition-all", iconColor[color as keyof typeof iconColor])}>
        Explore <ArrowRight size={20} />
      </div>
    </div>
    <div className="w-full md:w-1/2 relative overflow-hidden md:rounded-r-3xl">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} 
      />
       <div className={clsx("absolute inset-0 opacity-30 mix-blend-overlay transition-opacity group-hover:opacity-50", 
        color === 'cyan' ? 'bg-cyan-900' : color === 'orange' ? 'bg-orange-900' : color === 'purple' ? 'bg-purple-900' : 'bg-emerald-900'
       )}></div>
    </div>
  </motion.div>
)};

// --- Main Page ---

export default function Home() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={scrollRef} className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-cyan-200 selection:text-cyan-900 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Organic Background Blob */}
        <motion.div style={{ y: heroBgY }} className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-cyan-100/60 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-3xl -z-10 pointer-events-none"></motion.div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-orange-100/40 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] blur-3xl -z-10 pointer-events-none"></div>


        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] mb-8 tracking-tighter">
              Move<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-300">Faster</span>.<br />
              Together.
            </h1>
            <p className="text-gray-600 text-xl mb-10 max-w-md font-medium leading-relaxed">
              Iraq's Superapp for moving people and parcels. From motorcycle taxis to inter-city travel, Wiyaak gets you there.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.05 }} className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 shadow-xl transition flex items-center gap-2">
                Download App <Smartphone size={20}/>
              </motion.button>
            </div>
          </motion.div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <HeroWidget />
          </div>
        </div>
      </header>

      {/* Ecosystem Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-20">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center md:text-left"
        >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Your city, unlocked.</h2>
            <p className="text-xl text-gray-600 max-w-2xl">One app for every trip, every budget, and every delivery across Iraq.</p>
        </motion.div>
        
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard 
              color="cyan"
              icon={Car} 
              title="Wiyaak Go" 
              desc="Daily on-demand rides. Choose Moto for speed, Saver for budget, or Comfort for AC and space." 
              img="https://images.unsplash.com/photo-1610642372656-b6a2c624303e?auto=format&fit=crop&q=80&w=1000"
            />
            <ServiceCard 
              color="purple"
              icon={Bus} 
              title="Wiyaak Commute" 
              desc="Pre-book your seat on premium AC buses with fixed routes and virtual stops. Stress-free daily travel." 
              img="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1000"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard 
              color="orange"
              icon={Map} 
              title="Wiyaak Link" 
              desc="Inter-city travel made easy. Book seats to Basra or Erbil, or rent cars delivered to your door." 
              img="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1000"
            />
            <ServiceCard 
              color="green"
              icon={Truck} 
              title="Wiyaak Send" 
              desc="Instant logistics. Send documents via Moto or move furniture with our pickup truck fleet." 
              img="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1000"
            />
          </div>
        </motion.div>
      </section>

      {/* Driver CTA */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden my-12">
        {/* Background slant */}
        <div className="absolute inset-0 bg-cyan-600 -skew-y-6 transform origin-top-left scale-110 z-0"></div>

        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="w-full md:w-1/2 pr-12"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight">Be your own boss. <br/>Start driving today.</h2>
            
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-xl"><ShieldCheck className="text-white" size={28} /></div>
                <div>
                    <h4 className="text-xl font-bold text-white">Instant Payouts</h4>
                    <p className="text-cyan-100 font-medium">Cash out your earnings instantly to ZainCash or QiCard.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-xl"><Car className="text-white" size={28} /></div>
                <div>
                    <h4 className="text-xl font-bold text-white">Flexible Fleet</h4>
                    <p className="text-cyan-100 font-medium">Drive your car, your motorcycle, or even your bus.</p>
                </div>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-cyan-900 px-10 py-5 rounded-full font-black text-xl shadow-2xl hover:shadow-white/20 transition">
              Become a Captain
            </motion.button>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="w-full md:w-1/2 h-[500px] relative"
          >
             {/* Organic Shape Mask for Image */}
             <div className="w-full h-full bg-gray-300 rounded-[40px] overflow-hidden relative shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white/30">
                 <div className="absolute inset-0 bg-cover bg-center scale-110 hover:scale-100 transition-transform duration-700" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1612158464659-90b403ce9194?auto=format&fit=crop&q=80&w=1000)' }} />
                 <div className="absolute inset-0 bg-cyan-900/20 mix-blend-multiply"></div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Footer (Endorsed Brand Strategy) */}
      <footer className="bg-gray-900 text-white py-20 px-6 md:px-12 relative overflow-hidden">
        {/* subtle background graphic */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-orange-500 to-purple-500"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-10 border-b border-gray-800/50">
            <div>
              <BrandName />
              <p className="text-gray-400 text-lg mt-4 max-w-xs font-medium">
                Moving Iraq forward, together.
              </p>
            </div>
            
            {/* The "Public Secret" Badge */}
            <motion.div 
              whileHover={{ opacity: 1, y: -2 }}
              className="mt-10 md:mt-0 flex flex-col items-end gap-1 opacity-60 hover:opacity-100 transition duration-300 cursor-pointer"
            >
              <span className="text-xs text-cyan-400 uppercase tracking-widest font-bold">Incubated by</span>
              <div className="flex items-center gap-2 font-black text-xl bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <span className="text-white">THE</span>
                <span className="text-cyan-400">IDEA</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="font-bold text-base text-cyan-400 uppercase tracking-wider mb-6">Company</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition">About Wiyaak</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition">Careers</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition">The IDEA Group</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-bold text-base text-cyan-400 uppercase tracking-wider mb-6">Services</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition">Go (Ride)</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition">Commute (Bus)</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition">Link (Travel)</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition">Send (Logistics)</Link></li>
              </ul>
            </div>
            {/* Add more columns as needed */}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6 font-medium">
            <p>© 2026 Wiyaak Technologies. A subsidiary of The IDEA.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-cyan-400 transition">Privacy</Link>
              <Link href="#" className="hover:text-cyan-400 transition">Terms</Link>
              <div className="flex items-center gap-2">
                 <MapPin size={16} className="text-cyan-600" /> Baghdad, IQ
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
