import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/");
  }

  return <LoginForm />;
}
