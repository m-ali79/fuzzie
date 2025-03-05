import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async (request: NextRequest) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return Response.json(
        { message: "User not authenticated" },
        { status: 401 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return Response.json(
        { message: "Missing authorization code" },
        { status: 400 },
      );
    }

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID as string,
        client_secret: process.env.DISCORD_CLIENT_SECRET as string,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI as string,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      throw new Error(`Discord API error: ${errorData.error_description}`);
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token || !tokenData.refresh_token) {
      return Response.json(
        { message: "Invalid token response from Discord" },
        { status: 400 },
      );
    }

    if (!tokenData.webhook?.id) {
      return Response.json(
        { message: "Missing webhook data in response" },
        { status: 400 },
      );
    }

    const existingAccount = await db.account.findFirst({
      where: {
        userId,
        providerId: "discord",
      },
    });

    if (existingAccount) {
      return Response.json(
        { message: "Discord account already connected" },
        { status: 409 },
      );
    }

    await db.$transaction([
      db.account.create({
        data: {
          userId,
          providerId: "discord",
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          scope: tokenData.scope,
          accessTokenExpiresAt: new Date(
            Date.now() + tokenData.expires_in * 1000,
          ),
          refreshTokenExpiresAt: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ),
        },
      }),
      db.discordWebhook.create({
        data: {
          userId,
          webhookId: tokenData.webhook.id,
          webhookName: tokenData.webhook.name,
          webhookUrl: tokenData.webhook.url,
          guildId: tokenData.webhook.guild_id,
          channelId: tokenData.webhook.channel_id,
        },
      }),
    ]);

    redirect("/connections");
  } catch (error) {
    console.error("Error in Discord callback handler:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
