export interface Connection {
  id: ConnectionId;
  logo: string;
  title: string;
  description: string;
  oauthUrl: string;
  requiredScopes: string[];
}

export type ConnectionId = "google" | "discord" | "notion" | "slack";

export const CONNECTIONS: Connection[] = [
  {
    id: "google",
    logo: "/googleDrive.png",
    title: "Google Drive",
    description: "Connect Google Drive to listen to folder changes",
    oauthUrl: process.env.GOOGLE_OAUTH_URL || "",
    requiredScopes: [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
    ],
  },
  {
    id: "discord",
    logo: "/discord.png",
    title: "Discord",
    description: "Connect your Discord to send notifications and messages",
    oauthUrl: process.env.DISCORD_OAUTH_URL || "",
    requiredScopes: ["bot", "messages.read"],
  },
  {
    id: "notion",
    logo: "/notion.png",
    title: "Notion",
    description: "Create entries in Notion and automate tasks",
    oauthUrl: process.env.NOTION_OAUTH_URL || "",
    requiredScopes: ["write", "read"],
  },
  {
    id: "slack",
    logo: "/slack.png",
    title: "Slack",
    description: "Send notifications through your custom Slack bot",
    oauthUrl: process.env.SLACK_OAUTH_URL || "",
    requiredScopes: ["chat:write", "channels:read"],
  },
] as const;
