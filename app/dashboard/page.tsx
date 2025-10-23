import { 
  MainActionsGrid, 
  AdministrationSection
} from "@/components/dashboard";
import { Footer } from "@/components/footer";

export default function DashboardPage() {
  return (
    <>
      <MainActionsGrid />
      <AdministrationSection />
      <Footer />
    </>
  );
}
