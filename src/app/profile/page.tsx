"use client";

import { useState } from "react";
import Image from "next/image";
import { Nav } from "@/components/layout/nav";
import InstallPwa from "@/components/pages/InstallPwa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const [user, setUser] = useState<{ userName?: string; userEmail?: string }>({
    userName: "",
    userEmail: "",
  });

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUserInfos = () => {};
  return (
    <>
      <Nav title="Perfil" />
      <main className="flex-1 bg-theme-gray">
        <div className="flex flex-col gap-8 p-6 h-full">
          <div className="flex flex-col gap-4 justify-start">
            <h2>Suas Informações</h2>
            <Input
              onChange={(e) => setUser({ userName: e.target.value })}
              type="text"
              name="userName"
              placeholder="Nome"
              className="w-auto"
            />
            <Input
              onChange={(e) => setUser({ userEmail: e.target.value })}
              type="text"
              name="userEmail"
              placeholder="Email"
              className="w-auto"
            />
            <Button
              className=""
              onClick={handleUpdateUserInfos}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C6.48 0 0 6.48 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Salvar"
              )}
            </Button>
            {/* Exibir mensagem de erro */}
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>

          <div className="border-t border-gray-500"></div>
          <div className="flex flex-col gap-6 border rounded-lg w-full h-[200px] relative ">
            <Image
              className="w-full h-full rounded-lg object-cover "
              src={"/assets/images/download-banner.jpg"}
              fill
              alt="banner download"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <InstallPwa />
        </div>
      </main>
    </>
  );
}
