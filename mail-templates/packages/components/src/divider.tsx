import { Hr, type HrProps } from "@react-email/components";
import { cn } from "./utils";

type Props = HrProps;

export const Divider = ({ className, ...props }: Props) => {
  return <Hr className={cn("my-6 border-gray-200", className)} {...props} />;
};
