import { db } from "@/lib/db";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CONNECTIONS } from "@/constants/connections";

const getConnectionStatuses = async (
  userId: string
): Promise<Record<string, boolean>> => {
  try {
    const accounts = await db.account.findMany({
      where: { userId },
      select: { providerId: true, scope: true },
    });

    return CONNECTIONS.reduce((acc, connection) => {
      const account = accounts.find((a) => a.providerId === connection.id);
      if (!account?.scope) return { ...acc, [connection.id]: false };

      const accountScopes = account.scope.split(" ");
      const hasAllRequiredScopes = connection.requiredScopes.every(
        (requiredScope) => accountScopes.includes(requiredScope)
      );

      return {
        ...acc,
        [connection.id]: hasAllRequiredScopes,
      };
    }, {} as Record<string, boolean>);
  } catch (error) {
    console.error("Error fetching connection statuses:", error);
    return {};
  }
};

const AllConnections = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        please login to manage connections
      </div>
    );
  }

  const statuses = await getConnectionStatuses(session.user.id);

  return (
    <div className="space-y-6 p-6">
      {CONNECTIONS.map((connection) => (
        <div
          key={connection.id}
          className="flex justify-between items-center p-6 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors w-full space-x-9"
        >
          <div className="flex items-center gap-4">
            <Image
              src={connection.logo}
              alt={`${connection.title} logo`}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">
                {connection.title}
              </h3>
              <p className="text-sm text-gray-400">{connection.description}</p>
            </div>
          </div>
          {statuses[connection.id] ? (
            <Button
              variant="outline"
              className="bg-transparent border-green-500 text-green-500 hover:bg-green-500/10"
            >
              ✓ connected
            </Button>
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <Link href={connection.oauthUrl} prefetch={false}>
                connect
              </Link>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllConnections;
