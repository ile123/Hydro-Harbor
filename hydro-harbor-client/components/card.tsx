import { CardProps } from "@/types/props/CardProps";

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white dark:bg-[#393E46] rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
}
