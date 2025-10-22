import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MenuCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
  variant?: "default" | "admin";
}

export function MenuCard({ icon: Icon, title, onClick, variant = "default" }: MenuCardProps) {
  const isAdmin = variant === "admin";
  
  return (
    <Card 
      className={`hover:shadow-lg transition-all cursor-pointer border ${
        isAdmin 
          ? "border-2 border-accent hover:border-secondary bg-gradient-to-br from-white to-accent/5" 
          : "border-border hover:border-primary/30 bg-card hover:bg-primary/5"
      }`}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-8">
        <Icon className={`w-16 h-16 mb-4 transition-colors ${
          isAdmin ? "text-accent" : "text-muted-foreground group-hover:text-primary"
        }`} />
        <h3 className="text-sm font-medium text-card-foreground text-center">{title}</h3>
      </CardContent>
    </Card>
  );
}
