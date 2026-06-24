import {
  type ButtonProps,
  Button as ReactEmailButton,
} from "@react-email/components";
import { cn } from "./utils";

type Props = ButtonProps;

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <ReactEmailButton
      className={cn("bg-black px-6 py-3 font-medium text-white", className)}
      {...props}
    >
      {children}
    </ReactEmailButton>
  );
};
