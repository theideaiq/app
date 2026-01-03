'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Gamepad2, GraduationCap, Building2, ArrowRight, Star, Truck, ShieldCheck } from 'lucide-react';

// UI Kit
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const services = [
    {
      title: "The Megastore",
      desc: "Iraq's premium destination for electronics, books, and lifestyle.",
      icon: <ShoppingBag className="w-8 h-8 text-brand-pink" />,
      href: "/megastore",
      color: "border-brand-pink"
    },
    {
      title: "IDEA Plus",
      desc: "Rent PS5 games, books, and movies. Delivered to your door.",
      icon: <Gamepad2 className="w-8 h-8 text-brand-yellow" />,
      href: "/plus",
      color: "border-brand-yellow"
    },
    {
      title: "The Academy",
      desc: "Master new skills with cohort-based courses in Baghdad.",
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      href: "/academy", 
      color: "border-blue-500"
    },
    {
      title: "The IDEA Suite",
      desc: "Corporate solutions for procurement and recruitment.",
      icon: <Building2 className="w-8 h-8 text-brand-dark" />,
      href: "/suite",
      color: "border-brand-dark"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-4 py-20 lg:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0
