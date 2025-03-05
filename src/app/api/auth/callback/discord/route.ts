import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// if the user saved email does not match with the discord email
// make new record in db of new account
// also store data in discord own Table
// okay i will just connect the account no matter if the email is same or not
// but what about when i will use the discord thingy
// get user seession > id > account + discord > access Token > discord identifed
// the user from accessToken > send message

// exchange code for accessToken
// get the webhook
// store the webhook

export const GET = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json(
      { message: "user is not authenticated" },
      { status: 401 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code)
    return Response.json(
      { message: "Missing code Parameter" },
      { status: 400 },
    );

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

  const tokenData = await tokenResponse.json();

  console.log({
    tokenData,
  });

  await db.account.create({
    data: {
      userId,
      providerId: "discord",
      accessToken: tokenData.access_token as string,
      refreshToken: tokenData.refresh_token as string,
      scope: tokenData.scope as string,
      accessTokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
      refreshTokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  await db.discordWebhook.create({
    data: {
      userId,
      webhookId: tokenData.webhook.id,
      webhookName: tokenData.webhook.name,
      webhookUrl: tokenData.webhook.url,
      guildId: tokenData.webhook.guild_id,
      channelId: tokenData.webhook.channel_id,
    },
  });
};
