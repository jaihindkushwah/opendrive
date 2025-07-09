import DashboardPage from "@/components/dashboard-page";
import Header from "@/components/header";
import { getSession } from "@/lib/session-wrapper";
import RootProvider from "@/state/RootProvider";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <RootProvider user={session.user}>
      <Header />
      <DashboardPage />
    </RootProvider>
  );
}
