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

    const clientId = process.env.OAUTH_CLIENT_ID;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET;
    const redirectUri = process.env.OAUTH_REDIRECT_URI;

    const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    const tokenResponse = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      throw new Error(`Discord API error: ${errorData.error_description}`);
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return Response.json(
        { message: "Invalid token response from Discord" },
        { status: 400 },
      );
    }

    const existingAccount = await db.account.findFirst({
      where: {
        userId,
        providerId: "notion",
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
          providerId: "notion",
          accessToken: tokenData.access_token,
          scope: "content:insert,content:update",
        },
      }),

      db.notion.create({
        data: {
          botId: tokenData.bot_id,
          workscpaceId: tokenData.workscpace_id,
          workspaceName: tokenData.workspace_name,
          workspaceIcon: tokenData.workspace_icon,
          owner: tokenData.owner,
          duplicatedTemplateId: tokenData.duplicated_template_id,
          userId,
        },
      }),
    ]);

    redirect("/connections");
  } catch (error) {
    console.error("Error in Discord callback handler:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
