"use client";

import { NavListas } from "@/components/layout/nav-listas";
import { Lista } from "@/core/interfaces/lista.interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ListasPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const owner = searchParams.get("owner");

  const serverURL = "http://localhost:3001";

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [lists, setLists] = useState([]);

  const getLists = async () => {
    setIsLoading(true);

    //console.log(owner);
    try {
      const url = new URL(`${serverURL}/api/getList`);
      if (owner) url.searchParams.append("owner", owner);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        //console.log(data);
        setLists(data);
        setIsLoading(false);
        setError(null);
      } else {
        const error = await response.json();
        console.error("Error get list:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error get lists", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
      <NavListas title="Minhas Listas" showBackBtn={false} />
      <main className="flex-grow bg-theme-gray relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-14 h-14 border-8 text-theme-blue text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-theme-blue rounded-full"></div>
              Carregando...
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-6 h-full">
            {lists.length>0 ? (
              lists.map((lista: Lista) => {
                return (
                  <div
                    key={lista.id}
                    className="rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center"
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
              <h1>Nenhuma lista cadatrada!</h1>
            )}
          </div>
        )}
      </main>
    </>
  );
}
