"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import appImg from "@/assets/imgs/app-banner.png";
import { Nav } from "@/components/layout/nav";
import { useRouter } from "next/navigation";
import { Lista } from "@/core/interfaces/lista.interface";

export default function Home() {
  const router = useRouter();

  // LIST SETTINGS
  const [joinListName, setJoinListName] = useState<string | null>(null);
  const [joinListPassword, setJoinListPassword] = useState<string | null>(null);

  const [recentLists, setRecentLists] = useState<Lista[]>([]);
  const [filteredRecentLists, setFilteredRecentLists] = useState<Lista[]>([]);

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

        setRecentLists((prev) => {
          return [...prev, data.list];
        });

        router.push(
          `/lista?listId=${data.list.id}&listName=${encodeURIComponent(
            data.list.name
          )}`
        );

        setJoinListName(null);
        setJoinListPassword(null);
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

  const updateRecentsList = () => {
    const recents = localStorage.getItem("recents");
    const currentRecents = recents ? JSON.parse(recents) : [];

    const combinedRecents = [...currentRecents, ...recentLists];

    let uniqueRecents = Array.from(
      new Map(combinedRecents.map((item) => [item.id, item])).values()
    );

    uniqueRecents = uniqueRecents.slice(-3);
    localStorage.setItem("recents", JSON.stringify(uniqueRecents));

    setFilteredRecentLists(uniqueRecents.reverse());
  };

  useEffect(() => {
    const recents = localStorage.getItem("recents");
    const initialRecents = recents ? JSON.parse(recents) : [];

    setRecentLists(initialRecents);
  }, []);

  useEffect(() => {
    if (recentLists.length > 0) updateRecentsList();
  }, [recentLists]);

  return (
    <>
      <Nav title="Lista de compras" />
      <main className="flex-grow bg-theme-gray">
        <div className="flex flex-col gap-8 p-6 h-full">
          <div className="flex flex-col gap-6 border rounded-lg w-full h-[200px] relative">
            <Image
              className="w-full h-full rounded-lg object-cover "
              src={appImg}
              fill
              alt="banner app"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
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
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-500">
            <h1 className="mt-8">Listas recentes: </h1>
            {filteredRecentLists.length > 0 ? (
              filteredRecentLists.map((lista: Lista) => {
                return (
                  <div
                    key={lista.id}
                    className="rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center opacity-75"
                    onClick={() => {
                      router.push(
                        `/lista?listId=${
                          lista.id
                        }&listName=${encodeURIComponent(lista.name)}`
                      );
                    }}
                  >
                    <i className="bx bxs-right-arrow text-sm"></i>
                    <h2>{lista.name}</h2>
                  </div>
                );
              })
            ) : (
              <h2 className="text-sm">
                Você não entrou em nenhuma lista ainda!
              </h2>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
