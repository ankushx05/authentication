import { Button } from "@repo/ui/button";
import { Text } from "@repo/ui/text";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <main className="flex flex-col gap-2">
      <Text variant="h2">
        Hello Admin {isClicked && <span className="text-red-500">👋</span>}
      </Text>
      <Button
        className={"max-w-fit"}
        onClick={() => setIsClicked(true)}
        color="danger"
      >
        Click Me!
      </Button>
    </main>
  );
}
