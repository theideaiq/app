'use client';

import { Button, Input } from '@repo/ui';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateProfile } from '@/actions/account';

// biome-ignore lint/suspicious/noExplicitAny: Temporary fix for strict linting on complex profile object
export default function ProfileForm({ profile }: { profile: any }) {
  const t = useTranslations('Account');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await updateProfile(formData);
      toast.success('Profile updated');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'An error occurred';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="full_name"
            className="text-sm text-slate-400 mb-1 block"
          >
            {t('fullName')}
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <Input
              id="full_name"
              name="full_name"
              defaultValue={profile?.full_name}
              className="pl-10 bg-white/5 border-white/10 text-slate-200 focus:border-brand-yellow/50"
              placeholder="John Doe"
            />
          </div>
        </div>
        {/* Add more fields as needed */}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
