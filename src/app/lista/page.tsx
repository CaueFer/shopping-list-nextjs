"use client";

import { NavListas } from "@/components/layout/nav-listas";
import { Input } from "@/components/ui/input";
import { Lista } from "@/core/interfaces/lista.interface";
import { listItem } from "@/core/interfaces/listItem.interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleLista() {
  const serverURL = "http://localhost:3001";

  const searchParams = useSearchParams();
  const [listId, setListId] = useState<string | null>(null);
  const [listName, setListName] = useState<string | null>(null);
  const [listItems, setListItems] = useState<[] | null>([]);
  const [itemName, setItemName] = useState<string | null>(null);

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [lists, setLists] = useState([]);

  const getLists = async () => {
    setIsLoading(true);

    //console.log(owner);
    try {
      const url = new URL(`${serverURL}/api/getListItems`);
      if (listId) url.searchParams.append("listId", listId);

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
        console.error("Error get list items:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error get list items", error);
      setIsLoading(false);
    }
  };

  const createListItem = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${serverURL}/api/createListItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId,
          itemName,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        setIsLoading(false);
        setError(null);
      } else {
        const error = await response.json();
        console.error("Error create list items:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error create list items", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = searchParams.get("listId");
    const name = searchParams.get("listName");

    setListId(id);
    setListName(name);
  }, [searchParams]);

  useEffect(() => {
    if (listId && listName) {
      getLists();
    }
  }, [listId, listName]);

  return (
    <>
      <NavListas
        title={listName ? listName : "Carregando..."}
        showBackBtn={true}
      />
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
            {listItems && listItems.length > 0 ? (
              listItems.map((item: listItem) => {
                return (
                  <div
                    key={item.id}
                    className="rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center"
                  >
                    <i className="bx bxs-right-arrow text-sm"></i>
                    <h2>{item.name}</h2>
                  </div>
                );
              })
            ) : (
              <h1>Nenhum item cadatrado!</h1>
            )}

            <div className="rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center opacity-50">
              <i className="bx bxs-right-arrow text-sm"></i>
              <Input
                placeholder="Item..."
                className="border-0 ring-0 p-0 text-md placeholder:text-black focus-visible:ring-0 focus-visible:ring-offset-0 "
              />
            </div>
            <div className="rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center">
              <i className="bx bx-plus text-sm"></i>
              <h2>Adicionar item</h2>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
