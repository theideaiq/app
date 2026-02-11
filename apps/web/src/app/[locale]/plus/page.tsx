'use client';

import { Button } from '@repo/ui';
import { motion } from 'framer-motion';
import {
  Check,
  Crown,
  Gamepad2,
  Gift,
  Shield,
  Trophy,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PlusPage() {
  const _t = useTranslations('Plus');

  const benefits = [
    {
      icon: <Gamepad2 className="w-6 h-6 text-brand-yellow" />,
      title: 'Extended Library Access',
      description: 'Play over 500+ premium titles instantly',
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-yellow" />,
      title: 'Priority Queuing',
      description: 'Skip the wait on popular new releases',
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-yellow" />,
      title: 'Damage Protection',
      description: 'Full coverage for accidental damage',
    },
    {
      icon: <Gift className="w-6 h-6 text-brand-yellow" />,
      title: 'Monthly Rewards',
      description: 'Exclusive in-game items and discounts',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow mb-6 border border-brand-yellow/20"
          >
            <Crown size={20} />
            <span className="font-semibold">Gamestore Plus</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Level Up Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange">
              Gaming Experience
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10"
          >
            Join the ultimate gaming membership. Unlock exclusive benefits,
            priority access, and premium rewards.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-yellow text-black hover:bg-brand-yellow/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5">
              View Plans
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-yellow/30 transition-colors"
            >
              <div className="bg-black/40 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-white/5">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-slate-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow to-brand-orange rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-black/80 backdrop-blur-xl border border-brand-yellow/20 rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-yellow text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                MOST POPULAR
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-yellow/10 p-3 rounded-xl">
                  <Trophy className="text-brand-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Pro Gamer</h3>
                  <p className="text-slate-400 text-sm">Everything you need</p>
                </div>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-white">$14.99</span>
                <span className="text-slate-400">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited Rentals',
                  'Free Shipping',
                  'Priority Support',
                  'Cancel Anytime',
                  'No Late Fees'
                ].map((item, _i) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300">
                    <Check size={16} className="text-brand-yellow" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-brand-yellow text-black hover:bg-brand-yellow/90">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
