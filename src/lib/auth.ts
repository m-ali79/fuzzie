import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const scopes = [
  "email",  // Short form for userinfo.email
  "profile", // Short form for userinfo.profile
  "https://www.googleapis.com/auth/drive.metadata.readonly",
];


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {

    }
  }
  ,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: scopes.join(' '),
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }
  },
});
