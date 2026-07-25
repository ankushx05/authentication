import { Text } from "@react-email/components";
import { AppNameText, EmailDocument } from "@repo/components";

export type WelcomeEmailProps = {
  name: string;
  baseUrl?: string;
};

export const welcomeEmailSubject = "Welcome to our platform!";

export const WelcomeEmail = ({
  name,
  baseUrl = "https://example.com",
}: WelcomeEmailProps) => {
  return (
    <EmailDocument
      preview={`Welcome to ${AppNameText}`}
      heading="Welcome!"
      content={
        <>
          <Text>
            Hello Admin <span className="font-semibold">{name}</span>,
          </Text>
          <Text>
            Welcome to {AppNameText}! We are excited to have you on board.
          </Text>
          <Text>
            You can get started by visiting our dashboard at{" "}
            <a href={baseUrl}>{baseUrl}</a>.
          </Text>
        </>
      }
    />
  );
};
