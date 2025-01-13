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
import { useFingerprint } from "../../hooks/useFingerprint";
import { User } from "lucide-react";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const serverURL = process.env.NEXT_PUBLIC_API_URL;
  const [userId, setUserId] = useState(" ");

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

    if (!createListName || !createListPassword) {
      setIsLoading(false);
      setError("Nome e senha da lista inválido.");
      return;
    }

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
        const newUrl = `/listas?${query}`;

        const currentUrl = `${pathname}?${query}`;
        if (currentUrl === newUrl) {
          window.location.reload();
        } else {
          router.push(newUrl);
        }
      } else {
        const error = await response.json();

        console.error("Error creating list:", error);
        setError(error.error);

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating list:", error);
      setError("Ocorreu um erro, tente novamente!");
    }
  };

  const fingerprint = useFingerprint();
  useEffect(() => {
    if (fingerprint) {
      //console.log("Device Fingerprint:", fingerprint);
    }

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      if (fingerprint) {
        const newUserId = fingerprint;
        localStorage.setItem("userId", newUserId);
        setUserId(newUserId);
      }
    }
  }, [fingerprint]);

  return (
    <>
      <footer className="px-[5%] bg-white w-full flex h-20 text-black gap-3 relative">
        <div
          className={`absolute top-0 h-[2px] bg-theme-blue w-[16%] transition-all duration-300
          ${isActive("/listas") || isActive("/lista") ? "ml-[18.5%]" : ""}
          ${isActive("/enviar") ? "ml-[56%]" : ""}
          ${isActive("/profile") ? "ml-[74%]" : ""}
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
            isActive("/listas") || isActive("/lista") ? "text-theme-blue" : ""
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
            href={{
              pathname: "/enviar",
              query: { owner: userId },
            }}
            passHref
            className="flex flex-col items-center justify-center"
          >
            <i className="bx bx-send text-2xl"></i>
            <span>Enviar</span>
          </Link>
        </div>

        <div
          className={`flex-1 flex items-center justify-center text-sm ${
            isActive("/profile") ? "text-theme-blue" : ""
          }`}
        >
          <Link
            href="/profile"
            passHref
            className="flex flex-col items-center justify-center"
          >
            <User className="text-2xl" />
            <span className="mt-1">Perfil</span>
          </Link>
        </div>
      </footer>

      <div>
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
                {/* Exibir mensagem de erro */}
                {error && (
                  <div className="text-red-500 text-sm mt-3">{error}</div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="" disabled={isLoading}>
                Cancelar
              </AlertDialogCancel>
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
      </div>
    </>
  );
}
