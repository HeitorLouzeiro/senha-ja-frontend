import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MenuCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
  variant?: "default" | "admin";
  href?: string;
}

export function MenuCard({ icon: Icon, title, onClick, variant = "default", href }: MenuCardProps) {
  const isAdmin = variant === "admin";
  
  const cardContent = (
    <CardContent className="flex flex-col items-center justify-center p-8">
      <Icon className={`w-16 h-16 mb-4 transition-colors ${
        isAdmin ? "text-accent" : "text-muted-foreground group-hover:text-primary"
      }`} />
      <h3 className="text-sm font-medium text-card-foreground text-center">{title}</h3>
    </CardContent>
  );

  const cardClassName = `hover:shadow-lg transition-all cursor-pointer border ${
    isAdmin 
      ? "border-2 border-accent hover:border-secondary bg-gradient-to-br from-white to-accent/5" 
      : "border-border hover:border-primary/30 bg-card hover:bg-primary/5"
  }`;

  if (href) {
    return (
      <Link href={href}>
        <Card className={cardClassName}>
          {cardContent}
        </Card>
      </Link>
    );
  }
  
  return (
    <Card 
      className={cardClassName}
      onClick={onClick}
    >
      {cardContent}
    </Card>
  );
}
