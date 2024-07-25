"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCallback } from "react";

interface NavListasProps {
  title: string;
  showBackBtn?: boolean;
}

export function NavListas(props: NavListasProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <header className="px-6 py-4 bg-white w-full h-16 text-black flex items-center justify-between">
        <div className="flex flex-row items-center justify-center">
          {props.showBackBtn ? (
            <i
              role="button"
              className="bx bx-arrow-back text-xl p-2"
              onClick={handleBack}
            ></i>
          ) : (
            ""
          )}
          <span>{props.title}</span>
        </div>

        <div className="flex flex-row gap-4 items-center justify-center text-2xl">
          <i className="bx bx-trash "></i>
          <i className="bx bx-filter "></i>
          <i className="bx bx-dots-vertical-rounded "></i>
        </div>
      </header>
    </>
  );
}
