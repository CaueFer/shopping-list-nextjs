"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const serverURL = "http://localhost:3001";
  const [userId, setUserId] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [createListName, setCreateListName] = useState("");
  const [createListPassword, setCreateListPassword] = useState("");

  const [listId, setListId] = useState<number | null>(null);

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const isActive = (path: string) => pathname === path;

  const handleCreateList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(serverURL + "/api/createList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: createListName,
          password: createListPassword,
          owner: userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setListId(data.id);

        setIsLoading(false);
        setIsDialogOpen(false);
        setError(null);

        const query = new URLSearchParams({ owner: userId }).toString();
        router.push(`/listas?${query}`);
      } else {
        const error = await response.json();

        //console.error("Error creating list:", error);
        setError(error.error);

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating list:", error);
    }
  };

  useEffect(() => {
    function generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    }

    const storedUserId = localStorage.getItem("userId");
    const userIdTemp = localStorage.getItem("userId") || generateUUID();
    if (!storedUserId) localStorage.setItem("userId", userIdTemp);

    setUserId(userIdTemp);
  }, []);
  return (
    <>
      <footer className="px-4 bg-white w-full flex h-24 text-black rounded-t-lg gap-3 relative">
        <div
          className={`absolute top-0 h-[2px] bg-theme-blue w-[16%] transition-all duration-300
          ${isActive("/listas") ? "ml-[20.3%]" : ""}
          ${isActive("/enviar") ? "ml-[56%]" : ""}
          ${isActive("/config") ? "ml-[76.3%]" : ""}
        `}
        ></div>
        <div
          className={`flex-1 flex items-center justify-center text-sm ${
            isActive("/") ? "text-theme-blue" : ""
          }`}
        >
          <Link
            href="/"
            passHref
            className="flex flex-col items-center justify-center"
          >
            <i className="bx bx-home-alt text-2xl"></i>
            <span>Home</span>
          </Link>
        </div>

        <div
          className={`flex-1 flex items-center justify-center text-sm ${
            isActive("/listas") ? "text-theme-blue" : ""
          }`}
        >
          <Link
            href={{
              pathname: "/listas",
              query: { owner: userId },
            }}
            passHref
            className="flex flex-col items-center justify-center"
          >
            <i className="bx bx-search-alt text-2xl"></i>
            <span>Listas</span>
          </Link>
        </div>

        <div className="flex-1  flex flex-col items-center justify-center relative ">
          <div
            role="button"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-theme-blue w-[55px] h-[55px] xsm:w-[60px] xsm:h-[60px] rounded-full z-10 flex items-center justify-center"
            onClick={openDialog}
          >
            <i className="bx bx-plus text-4xl font-bold z-20 text-white"></i>
          </div>
        </div>

        <div
          className={`flex-1 flex items-center justify-center text-sm ${
            isActive("/enviar") ? "text-theme-blue" : ""
          }`}
        >
          <Link
            href="/enviar"
            passHref
            className="flex flex-col items-center justify-center"
          >
            <i className="bx bx-send text-2xl"></i>
            <span>Enviar</span>
          </Link>
        </div>

        <div
          className={`flex-1 flex items-center justify-center text-sm ${
            isActive("/config") ? "text-theme-blue" : ""
          }`}
        >
          <Link
            href="/config"
            passHref
            className="flex flex-col items-center justify-center"
          >
            <i className="bx bx-home-alt text-2xl"></i>
            <span>Listas</span>
          </Link>
        </div>
      </footer>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flex-row justify-between">
              Criar uma Lista
              <i
                className="bx bx-x text-3xl font-bold"
                onClick={() => setIsDialogOpen(false)}
              ></i>
            </AlertDialogTitle>
            <AlertDialogDescription className="py-4">
              <Input
                onChange={(e) => setCreateListName(e.target.value)}
                type="text"
                name="create-list-name"
                placeholder="Nome da Lista"
                className="w-full"
              />
              <Input
                onChange={(e) => setCreateListPassword(e.target.value)}
                type="text"
                name="create-list-pass"
                placeholder="Senha"
                className="w-full mt-4"
              />

              <div className="flex flex-col gap-4 justify-start text-start">
                {/* Exibir mensagem de erro */}
                {error && <div className="text-red-500 text-md">{error}</div>}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="">Cancelar</AlertDialogCancel>{" "}
            <Button
              className=""
              onClick={handleCreateList}
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
                "Criar"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
