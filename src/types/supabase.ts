// Origin Step — Supabase Database Types
//
// Generated from migrations in supabase/migrations/0001-0010.
// Matches the authoritative schema defined there.
//
// This file is hand-written and matches the generated output format,
// allowing full TypeScript support for Supabase queries via createClient<Database>.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          avatar_url: string | null;
          role: Database['public']['Enums']['user_role'];
          dance_level: Database['public']['Enums']['dance_level'] | null;
          learning_goals: string[];
          interested_in_mentorship: boolean;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string;
          email: string;
          avatar_url?: string | null;
          role?: Database['public']['Enums']['user_role'];
          dance_level?: Database['public']['Enums']['dance_level'] | null;
          learning_goals?: string[];
          interested_in_mentorship?: boolean;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          role?: Database['public']['Enums']['user_role'];
          dance_level?: Database['public']['Enums']['dance_level'] | null;
          learning_goals?: string[];
          interested_in_mentorship?: boolean;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      dance_styles: {
        Row: {
          id: string;
          slug: string;
          name: string;
          category: Database['public']['Enums']['style_category'];
          origin_region: string | null;
          era: string | null;
          summary: string;
          cultural_context: string | null;
          key_figures: string[] | null;
          practice_context: string | null;
          thumbnail_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          category: Database['public']['Enums']['style_category'];
          origin_region?: string | null;
          era?: string | null;
          summary: string;
          cultural_context?: string | null;
          key_figures?: string[] | null;
          practice_context?: string | null;
          thumbnail_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          category?: Database['public']['Enums']['style_category'];
          origin_region?: string | null;
          era?: string | null;
          summary?: string;
          cultural_context?: string | null;
          key_figures?: string[] | null;
          practice_context?: string | null;
          thumbnail_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_interests: {
        Row: {
          id: string;
          user_id: string;
          style_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          style_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          style_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_interests_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_interests_style_id_fkey';
            columns: ['style_id'];
            isOneToOne: false;
            referencedRelation: 'dance_styles';
            referencedColumns: ['id'];
          },
        ];
      };
      video_lessons: {
        Row: {
          id: string;
          style_id: string;
          title: string;
          slug: string;
          description: string | null;
          lesson_type: Database['public']['Enums']['lesson_type'];
          difficulty: Database['public']['Enums']['difficulty_level'];
          duration_seconds: number;
          video_url: string;
          thumbnail_url: string | null;
          instructor_name: string;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          style_id: string;
          title: string;
          slug: string;
          description?: string | null;
          lesson_type: Database['public']['Enums']['lesson_type'];
          difficulty: Database['public']['Enums']['difficulty_level'];
          duration_seconds: number;
          video_url: string;
          thumbnail_url?: string | null;
          instructor_name: string;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          style_id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          lesson_type?: Database['public']['Enums']['lesson_type'];
          difficulty?: Database['public']['Enums']['difficulty_level'];
          duration_seconds?: number;
          video_url?: string;
          thumbnail_url?: string | null;
          instructor_name?: string;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'video_lessons_style_id_fkey';
            columns: ['style_id'];
            isOneToOne: false;
            referencedRelation: 'dance_styles';
            referencedColumns: ['id'];
          },
        ];
      };
      user_video_progress: {
        Row: {
          id: string;
          user_id: string;
          video_id: string;
          watched_at: string;
          completed: boolean;
          completion_percent: number;
          notes: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_id: string;
          watched_at?: string;
          completed?: boolean;
          completion_percent?: number;
          notes?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          video_id?: string;
          watched_at?: string;
          completed?: boolean;
          completion_percent?: number;
          notes?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_video_progress_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_video_progress_video_id_fkey';
            columns: ['video_id'];
            isOneToOne: false;
            referencedRelation: 'video_lessons';
            referencedColumns: ['id'];
          },
        ];
      };
      mentors: {
        Row: {
          id: string;
          user_id: string;
          display_name: string;
          bio: string;
          city: string | null;
          country: string | null;
          specialisms: Database['public']['Enums']['style_category'][];
          teaching_values: string | null;
          intro_video_url: string | null;
          profile_image_url: string | null;
          approved: boolean;
          visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name: string;
          bio: string;
          city?: string | null;
          country?: string | null;
          specialisms?: Database['public']['Enums']['style_category'][];
          teaching_values?: string | null;
          intro_video_url?: string | null;
          profile_image_url?: string | null;
          approved?: boolean;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          display_name?: string;
          bio?: string;
          city?: string | null;
          country?: string | null;
          specialisms?: Database['public']['Enums']['style_category'][];
          teaching_values?: string | null;
          intro_video_url?: string | null;
          profile_image_url?: string | null;
          approved?: boolean;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'mentors_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      mentorship_applications: {
        Row: {
          id: string;
          user_id: string;
          mentor_id: string;
          status: Database['public']['Enums']['application_status'];
          why_this_style: string;
          why_this_mentor: string;
          goals_3_to_6_months: string;
          current_practice: string;
          support_needed: string;
          meaningful_outcome: string;
          optional_media_url: string | null;
          reviewer_notes: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mentor_id: string;
          status?: Database['public']['Enums']['application_status'];
          why_this_style: string;
          why_this_mentor: string;
          goals_3_to_6_months: string;
          current_practice: string;
          support_needed: string;
          meaningful_outcome: string;
          optional_media_url?: string | null;
          reviewer_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mentor_id?: string;
          status?: Database['public']['Enums']['application_status'];
          why_this_style?: string;
          why_this_mentor?: string;
          goals_3_to_6_months?: string;
          current_practice?: string;
          support_needed?: string;
          meaningful_outcome?: string;
          optional_media_url?: string | null;
          reviewer_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'mentorship_applications_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'mentorship_applications_mentor_id_fkey';
            columns: ['mentor_id'];
            isOneToOne: false;
            referencedRelation: 'mentors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'mentorship_applications_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      mentor_session_offerings: {
        Row: {
          id: string;
          mentor_id: string;
          format: Database['public']['Enums']['session_format'];
          title: string;
          description: string;
          base_price: number;
          currency: string;
          duration_minutes: number;
          pricing_notes: string | null;
          travel_cost_notes: string | null;
          studio_cost_notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mentor_id: string;
          format: Database['public']['Enums']['session_format'];
          title: string;
          description: string;
          base_price: number;
          currency?: string;
          duration_minutes: number;
          pricing_notes?: string | null;
          travel_cost_notes?: string | null;
          studio_cost_notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mentor_id?: string;
          format?: Database['public']['Enums']['session_format'];
          title?: string;
          description?: string;
          base_price?: number;
          currency?: string;
          duration_minutes?: number;
          pricing_notes?: string | null;
          travel_cost_notes?: string | null;
          studio_cost_notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'mentor_session_offerings_mentor_id_fkey';
            columns: ['mentor_id'];
            isOneToOne: false;
            referencedRelation: 'mentors';
            referencedColumns: ['id'];
          },
        ];
      };
      mentorship_next_steps: {
        Row: {
          id: string;
          application_id: string;
          mentor_session_offering_id: string | null;
          type: Database['public']['Enums']['next_step_type'];
          format: Database['public']['Enums']['session_format'];
          title: string;
          description: string | null;
          scheduled_at: string | null;
          duration_minutes: number | null;
          travel_cost: number | null;
          studio_cost: number | null;
          final_price: number;
          payment_required: boolean;
          payment_status: Database['public']['Enums']['payment_status'];
          stripe_reference: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          mentor_session_offering_id?: string | null;
          type: Database['public']['Enums']['next_step_type'];
          format: Database['public']['Enums']['session_format'];
          title: string;
          description?: string | null;
          scheduled_at?: string | null;
          duration_minutes?: number | null;
          travel_cost?: number | null;
          studio_cost?: number | null;
          final_price: number;
          payment_required?: boolean;
          payment_status?: Database['public']['Enums']['payment_status'];
          stripe_reference?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          application_id?: string;
          mentor_session_offering_id?: string | null;
          type?: Database['public']['Enums']['next_step_type'];
          format?: Database['public']['Enums']['session_format'];
          title?: string;
          description?: string | null;
          scheduled_at?: string | null;
          duration_minutes?: number | null;
          travel_cost?: number | null;
          studio_cost?: number | null;
          final_price?: number;
          payment_required?: boolean;
          payment_status?: Database['public']['Enums']['payment_status'];
          stripe_reference?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'mentorship_next_steps_application_id_fkey';
            columns: ['application_id'];
            isOneToOne: false;
            referencedRelation: 'mentorship_applications';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'mentorship_next_steps_mentor_session_offering_id_fkey';
            columns: ['mentor_session_offering_id'];
            isOneToOne: false;
            referencedRelation: 'mentor_session_offerings';
            referencedColumns: ['id'];
          },
        ];
      };
      saved_items: {
        Row: {
          id: string;
          user_id: string;
          item_type: Database['public']['Enums']['saved_item_type'];
          item_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: Database['public']['Enums']['saved_item_type'];
          item_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_type?: Database['public']['Enums']['saved_item_type'];
          item_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'saved_items_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      editorial_content: {
        Row: {
          id: string;
          style_id: string | null;
          slug: string;
          title: string;
          content: string;
          status: Database['public']['Enums']['content_status'];
          author_id: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          style_id?: string | null;
          slug: string;
          title: string;
          content: string;
          status?: Database['public']['Enums']['content_status'];
          author_id?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          style_id?: string | null;
          slug?: string;
          title?: string;
          content?: string;
          status?: Database['public']['Enums']['content_status'];
          author_id?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'editorial_content_style_id_fkey';
            columns: ['style_id'];
            isOneToOne: false;
            referencedRelation: 'dance_styles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'editorial_content_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      set_updated_at: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      handle_new_auth_user: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };
    Enums: {
      user_role: 'student' | 'mentor' | 'admin';
      dance_level: 'non_dancer' | 'beginner' | 'intermediate' | 'experienced';
      style_category:
        | 'hip_hop_foundation'
        | 'house'
        | 'locking'
        | 'popping'
        | 'breaking'
        | 'waacking'
        | 'voguing'
        | 'krump'
        | 'party_groove'
        | 'social_groove'
        | 'experimental'
        | 'contemporary'
        | 'other';
      lesson_type:
        | 'groove'
        | 'basics'
        | 'drill'
        | 'social_application'
        | 'practice_guidance'
        | 'cultural_context';
      difficulty_level: 'entry' | 'beginner' | 'intermediate' | 'advanced';
      application_status:
        | 'draft'
        | 'submitted'
        | 'in_review'
        | 'accepted'
        | 'declined'
        | 'waitlisted'
        | 'needs_more_context'
        | 'invited_to_next_step';
      session_format: 'online' | 'in_person';
      next_step_type:
        | 'online_session'
        | 'in_person_session'
        | 'consultation'
        | 'mentorship_container'
        | 'other';
      payment_status: 'pending' | 'paid' | 'waived' | 'refunded';
      saved_item_type: 'style' | 'video' | 'mentor';
      content_status: 'draft' | 'published' | 'archived';
    };
    CompositeTypes: Record<string, unknown>;
  };
};
