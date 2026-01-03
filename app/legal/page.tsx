import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h1 className="text-3xl font-bold text-brand-dark mb-2">Terms of Service</h1>
      <p className="text-slate-500 mb-8 text-sm">Last Updated: January 3, 2026</p>

      <div className="space-y-6 text-slate-700 leading-relaxed font-sans">
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-3">1. Introduction</h2>
          <p>
            Welcome to The IDEA IQ. By accessing our website, purchasing from The Megastore, 
            renting from IDEA Plus, or enrolling in The Academy, you agree to be bound by these Terms of Service.
            These terms apply to all users of the site, including browsers, vendors, customers, merchants, and contributors of content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-3">2. IDEA Plus Rental Specifics</h2>
          <p>
            <strong>2.1 Subscription:</strong> IDEA Plus memberships are billed monthly. You may cancel at any time.
            <br/>
            <strong>2.2 Damage & Loss:</strong> You are responsible for the condition of rented items (Books, Games, Movies). 
            Minor wear and tear is expected, but significant damage or loss of item will result in a replacement fee charged to your payment method.
            <br/>
            <strong>2.3 Return Windows:</strong> Items must be returned within the active subscription period to avoid additional charges.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-3">3. The Academy Enrollment</h2>
          <p>
            Course materials are for your personal use only. Sharing login credentials or distributing course content 
            is strictly prohibited and will result in immediate account termination without refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-3">4. Payments & Refunds</h2>
          <p>
            All prices are listed in Iraqi Dinar (IQD). We reserve the right to change prices at any time.
            Refunds for digital goods (Academy) are not typically provided once accessed. 
            Physical goods (Megastore) may be returned within 14 days if unopened.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-3">5. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of Iraq. The IDEA IQ and yourself irrevocably 
            consent that the courts of Baghdad shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>
        </section>
        
        <div className="mt-8 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Questions about the Terms of Service should be sent to us at <a href="mailto:legal@theideaiq.com" className="text-brand-pink underline">legal@theideaiq.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
