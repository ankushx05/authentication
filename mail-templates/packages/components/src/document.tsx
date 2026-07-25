import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Divider } from "./divider";

export type EmailDocumentProps = {
  preview?: string;
  heading?: string;
  content: React.ReactNode;
};

const Logo = () => {
  return (
    <Section className="my-4">
      <Row>
        <Column align="center">
          <Img
            alt={AppNameText}
            width={150}
            src="https://cdn.jamsrworld.com/next-mlm-test/10-10-2025/nextmlm_full_logo_dark-1760081317492-412120033.png"
            className="block"
          />
        </Column>
      </Row>
    </Section>
  );
};

export const AppNameText = "Next MLM";

export const AppName = () => {
  return <strong>{AppNameText}</strong>;
};

const baseUrl = process.env.NEXT_PUBLIC_WWW_URL
  ? `${process.env.NEXT_PUBLIC_WWW_URL}`
  : "";

export const EmailDocument = ({
  preview,
  heading,
  content,
}: EmailDocumentProps) => (
  <Html>
    <Head />
    <Tailwind
      config={{
        theme: {
          extend: {
            container: {
              center: true,
            },
            colors: {
              primary: "#4f46e5",
              secondary: "#6b7280",
            },
            backgroundColor: {
              background: "#f9fafb",
              secondary: "#f9fafb",
              tertiary: "#f4f5f7",
            },
          },
        },
      }}
    >
      {preview && <Preview>{preview}</Preview>}
      <Body className="font-sans">
        <Link href={baseUrl}>
          <Logo />
        </Link>
        <Container className="max-w-xl border border-solid border-[#eaeaea] bg-white p-8">
          <Section align="center" className="mb-6 text-center">
            {heading && (
              <Heading className="mt-2 text-2xl font-bold">{heading}</Heading>
            )}
          </Section>

          {content}

          <Text className="text-sm">
            <strong>
              Best regards,
              <br />
              The {AppNameText} Team
            </strong>
          </Text>

          <Divider />
          <Text className="text-center text-sm">
            ©2025{" "}
            <Link href={baseUrl} className="text-black">
              {<AppName />}
            </Link>
            . All Rights Reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
