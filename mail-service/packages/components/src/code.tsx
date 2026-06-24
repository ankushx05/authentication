import { Section, Text, type SectionProps } from "@react-email/components";
import { cn } from "./utils";

type Props = SectionProps & {
  code: number;
};

export const Code = ({ code, className, ...props }: Props) => (
  <Section
    className={cn("my-4 rounded-xl bg-gray-100 py-5 text-center", className)}
    {...props}
  >
    <Text className="text-3xl font-bold tracking-[8px] text-gray-900">
      {code}
    </Text>
  </Section>
);
