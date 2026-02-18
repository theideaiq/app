'use client';

import { Badge } from '@repo/ui';
import { motion } from 'framer-motion';
import { BookOpen, Check, Crown, Gamepad2, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PlusPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <Badge className="bg-brand-yellow text-black font-bold px-4 py-1 text-sm">
              THE IDEA +
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            UNLOCK <span className="text-brand-yellow">MAXIMUM</span> POTENTIAL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Join the elite club of gamers and creators. Get exclusive drops,
            faster shipping, and rewards that matter.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* FREE TIER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:border-white/20 transition-colors"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Member</h3>
              <div className="text-4xl font-black">Free</div>
              <p className="text-slate-400 mt-2 text-sm">
                For casual gamers and shoppers.
              </p>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              {[
                'Access to standard store',
                'Standard shipping (3-5 days)',
                'Basic customer support',
                'Community access',
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <Check className="text-white/20 shrink-0 mt-0.5" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="w-full py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 transition-colors"
            >
              Join for Free
            </button>
          </motion.div>

          {/* PLUS TIER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-brand-yellow text-black rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_-10px_rgba(255,255,0,0.3)]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-black text-brand-yellow text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest border border-brand-yellow">
                Most Popular
              </span>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Crown size={24} className="fill-black" /> PLUS
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">15,000</span>
                <span className="text-xl font-bold opacity-60">IQD/mo</span>
              </div>
              <p className="opacity-80 mt-2 text-sm font-medium">
                The ultimate experience for serious gamers.
              </p>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              {[
                'Free Same-Day Delivery (Baghdad)',
                'Early Access to Console Drops',
                '5% Storewide Discount',
                'Priority Support 24/7',
                'Exclusive Member Events',
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm font-bold"
                >
                  <Check className="text-black shrink-0 mt-0.5" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="w-full py-4 rounded-xl font-black bg-black text-brand-yellow hover:bg-black/80 transition-colors"
            >
              Upgrade to Plus
            </button>
          </motion.div>

          {/* PRO TIER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:border-brand-pink/50 transition-colors group"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-pink transition-colors">
                Pro
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">35,000</span>
                <span className="text-xl text-slate-500">IQD/mo</span>
              </div>
              <p className="text-slate-400 mt-2 text-sm">
                For creators and competitive players.
              </p>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              {[
                'Everything in Plus',
                '10% Storewide Discount',
                'Access to Creator Studio',
                'Beta Testing New Features',
                'Dedicated Account Manager',
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <Check
                    className="text-brand-pink shrink-0 mt-0.5"
                    size={16}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="w-full py-4 rounded-xl font-bold bg-white/10 hover:bg-brand-pink hover:text-white transition-all"
            >
              Go Pro
            </button>
          </motion.div>
        </div>

        {/* FEATURES GRID */}
        <div className="mt-32">
          <h2 className="text-3xl font-black text-center mb-16">
            WHY JOIN <span className="text-brand-yellow">THE IDEA +</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-brand-yellow/20 rounded-full flex items-center justify-center text-brand-yellow mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Get your gear before anyone else with priority processing and
                same-day delivery options in select areas.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-brand-pink/20 rounded-full flex items-center justify-center text-brand-pink mb-6">
                <Gamepad2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Access</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Be the first to know about PS5 Pro drops, limited edition
                collectibles, and rare vintage finds.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Join exclusive tournaments, get tickets to local gaming events,
                and connect with top creators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
