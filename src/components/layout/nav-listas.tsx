"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomDropdown } from "./dropdown";
import { toast } from "../ui/use-toast";

interface NavListasProps {
  listId?: string | null;
  title: string;
  showBackBtn?: boolean;
}

export function NavListas({ listId, title, showBackBtn }: NavListasProps) {
  const [position, setPosition] = useState("bottom");

  const serverURL = "http://localhost:3001";

  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const deleteList = () => {
    console.log(listId)
    if (listId) {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const response = await fetch(serverURL + "/api/deleteList", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              listId,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data)
            // DATA => ITEM Q FOI CRIADO
            //callUpdateItemSocket(data.item, "delete");

            const storedUserId = localStorage.getItem("userId");

            if (storedUserId) {
              const query = new URLSearchParams({
                owner: storedUserId,
              }).toString();
              router.push(`/listas?${query}`);
            }

            toast({
              description: "Lista deletada!",
            });

            resolve();
          } else {
            const error = await response.json();
            console.error("Error delete list:", error);
            reject(new Error(`Error deleting list: ${error.message}`));
          }
        } catch (error) {
          console.error("Error delete list", error);
          reject(error);
        }
      });
    }
  };

  return (
    <>
      <header className="px-6 py-4 bg-white w-full h-16 text-black flex items-center justify-between ">
        <div className="flex flex-row items-center justify-center">
          {showBackBtn ? (
            <i
              role="button"
              className="bx bx-arrow-back text-xl p-2"
              onClick={handleBack}
            ></i>
          ) : (
            ""
          )}
          <span>{title}</span>
        </div>

        <div className="flex flex-row gap-4 items-center justify-center text-2xl">
          <CustomDropdown icon={<i className="bx bx-filter"></i>}>
            <DropdownMenuLabel>Ordenar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">A - Z </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Recentes
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </CustomDropdown>

          <CustomDropdown
            icon={<i className="bx bx-dots-vertical-rounded "></i>}
          >
            <DropdownMenuItem
              onClick={(e) => {
                deleteList();
              }}
            >
              Deletar Lista
            </DropdownMenuItem>
          </CustomDropdown>
        </div>
      </header>
    </>
  );
}
