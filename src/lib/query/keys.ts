// Central query key registry for React Query.
//
// All keys are defined here as typed factory functions or constants.
// This prevents string literal duplication, makes invalidation explicit,
// and gives IDE autocomplete on cache operations throughout the codebase.
//
// Usage:
//   useQuery({ queryKey: queryKeys.mentors.detail(id), ... })
//   queryClient.invalidateQueries({ queryKey: queryKeys.mentorship.applications.mine(userId) })
//   queryClient.setQueryData(queryKeys.profile.me(userId), updatedData)

export const queryKeys = {
  // ─── Auth ─────────────────────────────────────────────────────────────────
  auth: {
    session: () => ['auth', 'session'] as const,
    status: () => ['auth', 'status'] as const,
  },

  // ─── Profile ──────────────────────────────────────────────────────────────
  profile: {
    me: (userId: string) => ['profile', userId] as const,
  },

  // ─── Styles (Dance Styles Catalog) ────────────────────────────────────────
  styles: {
    all: () => ['styles', 'all'] as const,
    list: (filters?: Record<string, unknown>) => ['styles', 'list', filters] as const,
    detail: (styleId: string) => ['styles', 'detail', styleId] as const,
    bySlug: (slug: string) => ['styles', 'slug', slug] as const,
  },

  // ─── Videos (Video Lessons) ───────────────────────────────────────────────
  videos: {
    all: () => ['videos', 'all'] as const,
    list: (filters?: Record<string, unknown>) => ['videos', 'list', filters] as const,
    detail: (videoId: string) => ['videos', 'detail', videoId] as const,
    byStyle: (styleId: string) => ['videos', 'style', styleId] as const,
    progress: {
      all: (userId: string) => ['videos', 'progress', userId, 'all'] as const,
      detail: (userId: string, videoId: string) => ['videos', 'progress', userId, videoId] as const,
    },
  },

  // ─── User Interests ───────────────────────────────────────────────────────
  interests: {
    mine: (userId: string) => ['interests', userId] as const,
  },

  // ─── Mentors ──────────────────────────────────────────────────────────────
  mentors: {
    all: () => ['mentors', 'all'] as const,
    list: (filters?: Record<string, unknown>) => ['mentors', 'list', filters] as const,
    detail: (mentorId: string) => ['mentors', 'detail', mentorId] as const,
    me: (userId: string) => ['mentors', 'me', userId] as const,
  },

  // ─── Mentor Offerings ─────────────────────────────────────────────────────
  offerings: {
    forMentor: (mentorId: string) => ['offerings', 'mentor', mentorId] as const,
  },

  // ─── Mentorship ───────────────────────────────────────────────────────────
  mentorship: {
    applications: {
      all: () => ['mentorship', 'applications', 'all'] as const,
      mine: (userId: string) => ['mentorship', 'applications', 'mine', userId] as const,
      detail: (applicationId: string) =>
        ['mentorship', 'applications', 'detail', applicationId] as const,
      forMentor: (mentorId: string) => ['mentorship', 'applications', 'mentor', mentorId] as const,
    },
    nextSteps: {
      all: () => ['mentorship', 'next-steps', 'all'] as const,
      forApplication: (applicationId: string) =>
        ['mentorship', 'next-steps', 'app', applicationId] as const,
      mine: (userId: string) => ['mentorship', 'next-steps', 'user', userId] as const,
    },
  },

  // ─── Journey (Bookmarks / Saved Items) ─────────────────────────────────────
  journey: {
    savedItems: (userId: string) => ['journey', 'saved', userId] as const,
    savedByType: (userId: string, itemType: string) =>
      ['journey', 'saved', userId, itemType] as const,
  },

  // ─── Editorial Content ────────────────────────────────────────────────────
  editorial: {
    all: () => ['editorial', 'all'] as const,
    published: () => ['editorial', 'published'] as const,
    detail: (contentId: string) => ['editorial', 'detail', contentId] as const,
    bySlug: (slug: string) => ['editorial', 'slug', slug] as const,
    byStyle: (styleId: string) => ['editorial', 'style', styleId] as const,
  },

  // ─── Admin ────────────────────────────────────────────────────────────────
  admin: {
    mentors: {
      pending: () => ['admin', 'mentors', 'pending'] as const,
      all: () => ['admin', 'mentors', 'all'] as const,
    },
    users: {
      all: () => ['admin', 'users', 'all'] as const,
      detail: (userId: string) => ['admin', 'users', userId] as const,
    },
    stats: () => ['admin', 'stats'] as const,
    editorialContent: {
      all: () => ['admin', 'editorial', 'all'] as const,
      detail: (contentId: string) => ['admin', 'editorial', contentId] as const,
    },
  },
} as const;
