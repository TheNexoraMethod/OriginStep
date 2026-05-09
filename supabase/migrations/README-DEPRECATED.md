<!-- DEPRECATED: This migration was superseded by the canonical schema in 0001-0010.

DO NOT RUN these migrations:
  - 20260427000001_create_profiles.sql
  - 20260427000002_create_content.sql
  - 20260427000003_create_progress.sql
  - 20260427000004_create_mentors.sql
  - 20260427000005_create_platform.sql
  - 20260427000006_rls_policies.sql
  - 20260427000007_create_indexes.sql

REASON: These were created as an alternative schema during early design.
The definitive Supabase schema is defined in migrations 0001-0010:
  - 0001_create_enums.sql
  - 0002_create_utility_functions.sql
  - 0003_create_users.sql
  - 0004_create_dance_styles.sql
  - 0005_create_video_lessons.sql
  - 0006_create_mentors.sql
  - 0007_create_mentorship.sql
  - 0008_create_saved_items.sql
  - 0009_create_editorial.sql
  - 0010_storage_policies.sql

The 0001-0010 migrations match:
  - src/types/domain.ts enum definitions
  - src/types/supabase.ts (Phase 4 generated types)
  - All feature entity types (Phase 4)

When setting up Supabase in Phase 5:
  npx supabase migration list    # verify 0001-0010 are present
  npx supabase db push          # apply only 0001-0010, skip 20260427*
-->
