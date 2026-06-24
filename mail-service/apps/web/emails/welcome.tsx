import { WelcomeEmail as WelcomeEmailTemplate } from "@repo/templates/web";

export default function WelcomeEmail() {
  return (
    <WelcomeEmailTemplate name="Ankush Kumar" baseUrl="https://example.com" />
  );
}
