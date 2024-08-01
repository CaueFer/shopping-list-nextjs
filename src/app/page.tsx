"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bannerImg from "@/assets/imgs/banner.png";
import { Nav } from "@/components/layout/nav";

export default function Home() {
  // LIST SETTINGS
  const [joinListName, setJoinListName] = useState("");
  const [joinListPassword, setJoinListPassword] = useState("");

  const [listId, setListId] = useState<number | null>(null);

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const serverURL = "http://localhost:3001";

  const handleJoinList = async () => {
    try {
      const response = await fetch(serverURL + "/api/joinList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: joinListName,
          password: joinListPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setListId(data.listId);
        setIsLoading(false);
      } else {
        const error = await response.json();
        console.error("Error joining list:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error joining list:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Nav title="Lista de compras"/>
      <main className="flex-grow bg-theme-gray">
        <div className="flex flex-col gap-2 p-6 h-full">
          <div className="flex flex-col gap-6 border rounded-lg w-full h-[160px] relative">
            <Image
              className="w-full h-full rounded-lg object-cover"
              src={bannerImg}
              fill
              alt="banner app"
            />
          </div>

          <div className="flex flex-col gap-4 justify-start">
            <h2>Entrar em uma Lista</h2>
            <Input
              onChange={(e) => setJoinListName(e.target.value)}
              type="text"
              name="join-list-name"
              placeholder="Nome da Lista"
              className="w-auto"
            />
            <Input
              onChange={(e) => setJoinListPassword(e.target.value)}
              type="text"
              name="join-list-pass"
              placeholder="Senha"
              className="w-auto"
            />
            <Button className="" onClick={handleJoinList} disabled={isLoading}>
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
                "Entrar"
              )}
            </Button>
            {/* Exibir mensagem de erro */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Exibir sala conectada */}
            {listId && (
              <div className="text-indigo">{`Sala atual: ${listId}`}</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
