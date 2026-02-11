export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      carts: {
        Row: {
          created_at: string;
          id: string;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "carts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      cart_items: {
        Row: {
          cart_id: string;
          created_at: string;
          id: string;
          product_id: string;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          cart_id: string;
          created_at?: string;
          id?: string;
          product_id: string;
          quantity: number;
          updated_at?: string;
        };
        Update: {
          cart_id?: string;
          created_at?: string;
          id?: string;
          product_id?: string;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey";
            columns: ["cart_id"];
            isOneToOne: false;
            referencedRelation: "carts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          category_id: string;
          compare_at_price: number | null;
          created_at: string;
          description: string | null;
          details: Json | null;
          gallery_urls: string[] | null;
          id: string;
          image_url: string | null;
          is_featured: boolean;
          is_verified: boolean;
          name: string;
          price: number;
          stock_count: number;
          tags: string[] | null;
          updated_at: string;
        };
        Insert: {
          category_id: string;
          compare_at_price?: number | null;
          created_at?: string;
          description?: string | null;
          details?: Json | null;
          gallery_urls?: string[] | null;
          id?: string;
          image_url?: string | null;
          is_featured?: boolean;
          is_verified?: boolean;
          name: string;
          price: number;
          stock_count?: number;
          tags?: string[] | null;
          updated_at?: string;
        };
        // biome-ignore lint/complexity/noBannedTypes: Supabase generated type
        Update: {};
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      // ... other tables
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
