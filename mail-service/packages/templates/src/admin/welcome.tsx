import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export const WelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our platform!</Preview>
      <Body
        style={{
          fontFamily: "sans-serif",
          backgroundColor: "#f6f9fc",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ color: "#333333" }}>Welcome to App admin!</Heading>
          <Text style={{ color: "#555555" }}>
            Thank you for signing up. We're excited to have you on board!
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
