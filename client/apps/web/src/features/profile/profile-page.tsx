import { Avatar } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Separator } from "@repo/ui/separator";
import { Skeleton } from "@repo/ui/skeleton";
import { Text } from "@repo/ui/text";
import { Link } from "@tanstack/react-router";
import { useProfile } from "./hooks/use-profile";
import { DefaultErrorComponent } from "#/components/default-error";

const ProfileInfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-3">
    <Text variant="paragraph2" className="text-foreground-secondary">
      {label}
    </Text>
    <Text variant="paragraph2" className="font-medium">
      {value}
    </Text>
  </div>
);

const ProfileSkeleton = () => (
  <div className="flex flex-col items-center gap-6">
    <Skeleton className="size-20 rounded-full" />
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-7 w-40 rounded-md" />
      <Skeleton className="h-5 w-56 rounded-md" />
    </div>
    <Separator />
    <div className="flex w-full flex-col gap-1">
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  </div>
);

export const ProfilePage = () => {
  const { data, isLoading, isError, error, refetch } = useProfile();

  if (isError) {
    return <DefaultErrorComponent error={error} reset={refetch} />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card isBordered radius="lg" className="w-full max-w-md">
        <Card.Content>
          {isLoading || !data ? (
            <ProfileSkeleton />
          ) : (
            <div className="flex flex-col items-center gap-6">
              <Avatar size="xl" color="primary" isBordered>
                <Avatar.Fallback>{data.fullname.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <div className="flex flex-col items-center gap-1">
                <Text variant="h4">{data.fullname}</Text>
                <Text
                  variant="paragraph2"
                  className="text-foreground-secondary"
                >
                  {data.email}
                </Text>
              </div>

              <Separator />

              <div className="flex w-full flex-col">
                <ProfileInfoRow label="Username" value={data.username} />
                <Separator />
                <ProfileInfoRow label="Email" value={data.email} />
                <Separator />
                <ProfileInfoRow label="Full Name" value={data.fullname} />
              </div>

              <Button
                color="danger"
                variant="light"
                className="w-full"
                render={<Link to="/login" />}
              >
                Sign Out
              </Button>
            </div>
          )}
        </Card.Content>
      </Card>
    </main>
  );
};
