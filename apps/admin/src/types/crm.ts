import { CRM_STATUSES, ROLES } from '@/lib/constants';
import type { UserRole } from './auth';

export type CRMStatus = (typeof CRM_STATUSES)[keyof typeof CRM_STATUSES];
export { UserRole };

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: UserRole | string;
  updated_at?: string;
  crm_tags: string[] | null;
  crm_status: CRMStatus | null;
}

export interface MarketingSegment {
  id: string;
  name: string;
  criteria: {
    role?: string;
    crm_status?: CRMStatus;
    [key: string]: any;
  };
  created_at: string;
}

export type CampaignStatus = 'draft' | 'scheduled' | 'sent' | 'failed';

export interface MarketingCampaign {
  id: string;
  subject: string;
  body_html: string;
  segment_id: string;
  status: CampaignStatus;
  sent_count: number;
  sent_at: string | null;
  created_at: string;

  // Optional join fields
  segment?: MarketingSegment;
}
