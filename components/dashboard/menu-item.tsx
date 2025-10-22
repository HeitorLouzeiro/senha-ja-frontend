import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "destructive";
}

export function MenuItem({ icon: Icon, label, onClick, variant = "default" }: MenuItemProps) {
  const isDestructive = variant === "destructive";
  
  return (
    <DropdownMenuItem 
      className={`group cursor-pointer ${
        isDestructive ? "text-destructive focus:text-white hover:text-white" : ""
      }`}
      onClick={onClick}
    >
      <Icon className={`w-4 h-4 mr-2 group-hover:text-white transition-colors ${
        isDestructive ? "" : "text-primary"
      }`} />
      <span>{label}</span>
    </DropdownMenuItem>
  );
}
