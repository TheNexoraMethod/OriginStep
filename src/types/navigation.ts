// Typed route parameter definitions aligned with the app/ route structure.
//
// These are used where route params need to be passed programmatically.
// Expo Router's typed routes feature (typedRoutes: true in app.json) generates
// type-safe href types automatically from the file structure — use those for
// navigation calls. This file is for cases where explicit param types are needed
// in hooks or services that don't have direct access to Expo Router.

export type StyleDetailParams = {
  slug: string;
};

export type VideoDetailParams = {
  id: string;
};

export type MentorDetailParams = {
  id: string;
};

export type MentorshipApplyParams = {
  mentorId: string;
};

export type ApplicationDetailParams = {
  id: string;
};

export type MentorDashboardApplicationParams = {
  id: string;
};

export type MentorOfferingParams = {
  id: string;
};
