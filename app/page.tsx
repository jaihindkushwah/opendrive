import Dashboard from "@/components/dashboard";
import Header from "@/components/header";
import { getSession } from "@/lib/session-wrapper";
import RootProvider from "@/state/RootProvider";
import { redirect } from "next/navigation"; // Optional: protect dashboard

export default async function Home() {
  const session = await getSession();

  if (!session?.user) {
    // 🚫 Optional: redirect to login if not authenticated
    redirect("/login");
  }

  return (
    <RootProvider user={session.user}>
      <Header/>
      <Dashboard />
    </RootProvider>
  );
}
