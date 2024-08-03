"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ReactNode, useCallback, useState } from "react";
import { toast } from "../ui/use-toast";
import { listItem } from "@/core/interfaces/listItem.interface";

interface NavListasProps {
  listId?: string | null;
  title: string;
  showBackBtn?: boolean;
  children?: ReactNode,
}

export function NavListas({ listId, title, showBackBtn, children }: NavListasProps) {
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
          {children}
        </div>
      </header>
    </>
  );
}
