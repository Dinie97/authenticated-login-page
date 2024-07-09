import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Dashboard from "@/app/components/Dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Dashboard />
    </main>
  );
}
