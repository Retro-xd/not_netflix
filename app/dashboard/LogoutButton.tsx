"use client";

import { Button } from "@/components/ui/button";
import { logout } from "./action";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return <div className="flex">
    <Button onClick={() => logout()} className="flex bg-accentColor text-white p-6 rounded-full sidebar-label">
      Logout
      <LogOut/>
    </Button>
  </div>
  
}
