import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
    error?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number; // This must be a number
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    error?: string;
  }

  // Ensure Account interface is properly typed
  interface Account {
    expires_in?: number; // `expires_in` can be number
  }

}
