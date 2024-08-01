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

interface NavListasProps {
  title: string;
  showBackBtn?: boolean;
}

export function NavListas({ title, showBackBtn }: NavListasProps) {
  const [position, setPosition] = useState("bottom");

  const serverURL = "http://localhost:3001";

  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <i className="bx bx-filter"></i>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-6" >
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
            </DropdownMenuContent>
          </DropdownMenu>
          <i className="bx bx-dots-vertical-rounded "></i>
        </div>
      </header>
    </>
  );
}
