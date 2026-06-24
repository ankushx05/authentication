import { WelcomeEmail as WelcomeEmailTemplate } from "@repo/templates/admin";

export default function WelcomeEmail() {
  return <WelcomeEmailTemplate name="Ankush" baseUrl="https://example.com" />;
}
