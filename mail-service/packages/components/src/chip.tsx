import { cn } from "./utils";

type ChipProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Chip = ({ children, className }: ChipProps) => {
  return (
    <div
      className={cn(
        "bg-primary-lighter text-primary-main max-w-max rounded-full px-4 py-1 text-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};
