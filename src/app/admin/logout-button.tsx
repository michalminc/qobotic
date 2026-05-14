"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left px-3 py-2 rounded-lg text-[12px] text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
    >
      Sign out
    </button>
  );
}
