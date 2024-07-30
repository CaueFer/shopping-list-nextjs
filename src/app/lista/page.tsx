"use client";

import { NavListas } from "@/components/layout/nav-listas";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lista } from "@/core/interfaces/lista.interface";
import { listItem } from "@/core/interfaces/listItem.interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function SingleLista() {
  const serverURL = "http://localhost:3001";

  const searchParams = useSearchParams();
  const [listId, setListId] = useState<string | null>(null);
  const [listName, setListName] = useState<string | null>(null);
  const [listItems, setListItems] = useState<listItem[]>([]);
  const [itemName, setItemName] = useState<string | null>(null);

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [addItem, setAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // SOCKET IO
  const [socket, setSocket] = useState<any>(undefined);

  const getListItem = async () => {
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
        cache: "no-cache",
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);

        setListItems(data);
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

  const addItemEventIn = () => {
    setAddItem(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const addItemEventOut = () => {
    setTimeout(() => {
      if (newItemName.length > 1) {
        createItem();
      } else {
        setAddItem(false);
        setNewItemName("");
      }
    }, 500);
  };

  const createItem = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(serverURL + "/api/createListItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId,
          newItemName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log(data);

        setListItems((prevItems) => [...prevItems, data]);

        // DATA => ITEM Q FOI CRIADO
        callUpdateItemSocket(data);

        setIsLoading(false);
        setError(null);
        setAddItem(false);
        setNewItemName("");
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

  const callUpdateItemSocket = (item: listItem) => {
    const updatedItem = {
      itemId: item.id,
      itemName: item.name,
      itemMarked: item.marked,
      listId: item.listId,
    };

    socket.emit("updateListItem", updatedItem, (response: any) => {
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    });
  };

  const updateItemName = (itemId: any, newName: string) => {
    console.log(itemId, newName);
    const updatedItems = listItems.map((item) =>
      item.id === itemId ? { ...item, name: newName } : item
    );

    setListItems(updatedItems);

    const updatedItem = updatedItems.find((item) => item.id === itemId);
    if (updatedItem) callUpdateItemSocket(updatedItem);
  };

  const updateItemMark = (itemId: number, newMark: boolean | string) => {
    if (typeof newMark === "boolean") {
      const updatedItems = listItems.map((item) =>
        item.id === itemId ? { ...item, marked: newMark } : item
      );

      setListItems(updatedItems);

      const updatedItem = updatedItems.find((item) => item.id === itemId);
      if (updatedItem) callUpdateItemSocket(updatedItem);
    }
  };

  useEffect(() => {
    const id = searchParams.get("listId");
    const name = searchParams.get("listName");

    setListId(id);
    setListName(name);

    if (listId && listName) {
      createSocketConnection();
    }
  }, [searchParams, listId]);


  const createSocketConnection = () => {
    const socketServer = io("http://localhost:3001");

    // CONEXAO
    socketServer.on("connect", () => {
      //console.log("Conectado ao servidor Socket.IO");
      setSocket(socketServer);

      if (listId)
        socketServer.emit("joinList", listId, (response: any) => {
          if (response.success) {
            // QUANDO CONNECTION SUCCESS, PUXA A LISTA DO BANCO
            getListItem();
          } else {
            console.error(response.message);
          }
        });
      else console.log("Join error, without listID!");
    });

    socketServer.on("connect_error", (err: any) => {
      console.error("Erro de conexão com o servidor Socket.IO:", err);
    });

    // UTILS
    socketServer.on("error", (errorMessage: string) => {
      setIsLoading(false);
      setError(errorMessage);
    });

    socketServer.on("joinedList", (joinedList: string) => {
      setIsLoading(false);
      console.log(joinedList);
    });

    socketServer.on("itemUpdated", (updatedItem: listItem) => {
      if (updatedItem) {
        getListItem();
      }
    });

    // socketServer.on("itemUpdated", (updatedItem) => {
    //   // Atualize a interface do usuário com o item atualizado
    // });

    // DISCONNECT
    return () => {
      socketServer.disconnect();
    };
  };

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
                    className="rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center justify-between drop-shadow-md"
                  >
                    <div className="flex flex-row gap-2 items-center text-black">
                      <Checkbox
                        defaultChecked={item.marked}
                        onCheckedChange={(e) => updateItemMark(item.id, e)}
                      />
                      <Input
                        placeholder="Item..."
                        className="border-0 ring-0 p-0 text-md focus-visible:p-0 placeholder:text-black focus-visible:ring-0 focus-visible:ring-offset-0 h-[24px]"
                        onChange={(e) =>
                          updateItemName(item.id, e.target.value)
                        }
                        value={item.name}
                      />
                    </div>

                    <i className="bx bx-dots-vertical-rounded text-sm"></i>
                  </div>
                );
              })
            ) : (
              <h1>Nenhum item cadatrado!</h1>
            )}

            <div
              className={`rounded-lg p-3 bg-white flex flex-row justify-between gap-2 text-md items-center drop-shadow-md opacity-50 
                ${
                  addItem
                    ? "animate-fade-up animate-duration-500 animate-ease-out"
                    : "hidden"
                }`}
            >
              <div className="flex flex-row gap-2 items-center text-black">
                <Checkbox />
                <Input
                  placeholder="Item..."
                  className="border-0 ring-0 p-0 text-md focus-visible:p-0 placeholder:text-black focus-visible:ring-0 focus-visible:ring-offset-0 h-[24px]"
                  ref={inputRef}
                  onBlur={addItemEventOut}
                  onChange={(e) => setNewItemName(e.target.value)}
                  value={newItemName}
                />
              </div>
              <i className="bx bx-dots-vertical-rounded text-sm"></i>
            </div>
            <div
              className="rounded-lg p-3 bg-white flex flex-row gap-2 text-md items-center opacity-70 drop-shadow-sm"
              onClick={addItemEventIn}
            >
              <i className="bx bx-plus text-sm"></i>
              <h2>Adicionar item</h2>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
