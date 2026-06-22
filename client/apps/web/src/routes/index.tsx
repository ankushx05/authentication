import { Button } from "@repo/ui/button";
import { Link as LinkUI } from "@repo/ui/link";
import { Text } from "@repo/ui/text";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <main className="flex flex-col gap-2">
      <Text variant="h2">
        Hello User {isClicked && <span className="text-red-500">👋</span>}
      </Text>
      <Button
        className={"max-w-fit"}
        onClick={() => setIsClicked(true)}
        color="primary"
      >
        Click Me!
      </Button>
      <LinkUI render={<Link to="/register" />}>Register</LinkUI>
      <LinkUI render={<Link to="/profile" />}>Profile</LinkUI>
    </main>
  );
}
