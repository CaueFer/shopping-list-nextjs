"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCallback, useState } from "react";

interface NavListasProps {
  title: string;
  showBackBtn?: boolean;
}

export function NavListas({ title, showBackBtn }: NavListasProps) {
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
          <i className="bx bx-filter"></i>
          <i className="bx bx-dots-vertical-rounded "></i>
        </div>
      </header>
    </>
  );
}
