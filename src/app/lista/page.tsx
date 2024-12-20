"use client";

import { NavListas } from "@/components/layout/nav-listas";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { listItem } from "@/core/interfaces/listItem.interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";
import { SwappItem } from "@/components/layout/swappItem";
import Image from "next/image";
import arrowImage from "@/assets/imgs/arrow-click.png";
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
import { CustomDropdown } from "@/components/layout/dropdown";

export default function SingleLista() {
  const serverURL = "http://localhost:3001";
  const router = useRouter();

  const searchParams = useSearchParams();
  const [listId, setListId] = useState<string | null>(null);
  const [listName, setListName] = useState<string | null>(null);

  const [listItems, setListItems] = useState<listItem[]>([]);
  const [filteredListItems, setFilteredListItems] = useState<listItem[]>([]);

  const [position, setPosition] = useState("bottom");

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // SETS AND TEMPS
  const [addItem, setAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // SOCKET IO
  const [socket, setSocket] = useState<any>(undefined);

  useEffect(() => {
    const id = searchParams.get("listId");
    const name = searchParams.get("listName");

    setListId(id);
    setListName(name);
  }, [searchParams]);

  useEffect(() => {
    if (listId) {
      getListItem();

      const socketIo = io(serverURL);
      setSocket(socketIo);

      // CONEXAO
      socketIo.on("connect", () => {
        //console.log("Conectado ao servidor Socket.IO");

        if (listId)
          socketIo.emit("joinList", listId, (response: any) => {
            if (response.success) {
              //console.log(response.message);
            } else {
              console.error(response.message);
            }
          });
        else console.log("Join error, without listID!");
      });

      return () => {
        socketIo.disconnect();
      };
    }
  }, [listId]);

  useEffect(() => {
    if (socket && listId && listItems.length > 0) {
      createSocketConnection();
    }
  }, [socket, listId, listItems]);

  const createSocketConnection = () => {
    if (!socket) return;

    socket.on("connect_error", (err: any) => {
      console.error("Erro de conexão com o servidor Socket.IO:", err);
    });

    // UTILS
    socket.on("error", (errorMessage: string) => {
      setIsLoading(false);
      setError(errorMessage);
    });

    socket.on("joinedList", (joinedList: string) => {
      setIsLoading(false);
      console.log(joinedList);
    });

    socket.on("itemUpdated", (updatedItem: listItem) => {
      if (updatedItem) {
        updateListAfterItemUpdate(updatedItem);
      }
    });

    socket.on("itemDeleted", (id: number) => {
      if (id) {
        updateListAfterItemDelete(id);
      }
    });
  };

  const getListItem = async () => {
    setIsLoading(true);

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

        //console.log(data);

        const listItemsShorted = data.sort((a: listItem, b: listItem) =>
          a.name.localeCompare(b.name)
        );

        // INICIALIZO OS 2 ARRAYS
        //console.log(listItemsShorted);

        setListItems(listItemsShorted);
        setFilteredListItems(listItemsShorted);

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
      if (newItemName.length > 2) {
        createItem();
      } else {
        setAddItem(false);
        setNewItemName("");
      }
    }, 250);
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

        setFilteredListItems((prevItems) => {
          const finalList = [...prevItems, data];
          finalList.sort((a, b) => a.name.localeCompare(b.name));

          return finalList;
        });

        // DATA => ITEM Q FOI CRIADO
        callUpdateItemSocket(data, "update");
        toast({
          description: "Item adicionado!",
        });

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

  const callUpdateItemSocket = (item: listItem, updateType: string) => {
    if (!socket) return;

    const updatedItem = {
      itemId: item.id,
      itemName: item.name,
      itemMarked: item.marked,
      listId: item.listId,
    };

    if (updateType === "update") {
      socket.emit("updateListItem", updatedItem, (response: any) => {
        if (response.success) {
          console.log(response.message);
        } else {
          console.error(response.message);
        }
      });
    }

    if (updateType === "delete") {
      socket.emit("deleteListItem", updatedItem, (response: any) => {
        if (response.success) {
          console.log(response.message);
        } else {
          console.error(response.message);
        }
      });
    }
  };

  const updateLocalItemName = (itemId: any, newName: string) => {
    setFilteredListItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.id === itemId ? { ...item, name: newName } : item
      );

      return updatedItems;
    });
  };

  const syncDbItemName = (itemId: any, newName: string) => {
    if (newName.length >= 2) {
      const updatedItem = filteredListItems.find((item) => item.id === itemId);
      if (updatedItem) callUpdateItemSocket(updatedItem, "update");
    }
  };

  const updateItemMark = (itemId: number, newMark: boolean | string) => {
    if (typeof newMark === "boolean") {
      const updatedItems = filteredListItems.map((item) =>
        item.id === itemId ? { ...item, marked: newMark } : item
      );

      setFilteredListItems(updatedItems);

      const updatedItem = updatedItems.find((item) => item.id === itemId);
      if (updatedItem) callUpdateItemSocket(updatedItem, "update");
    }
  };

  const updateListAfterItemUpdate = (updatedItem: listItem) => {
    setFilteredListItems((prevItems) => {
      const listToFilter = [...prevItems];

      const filteredList = listToFilter.filter(
        (item) => item.id !== updatedItem.id
      );

      const finalList = [...filteredList, updatedItem];
      finalList.sort((a, b) => a.name.localeCompare(b.name));

      return finalList;
    });
  };

  const updateListAfterItemDelete = (id: number) => {
    setFilteredListItems((prevItems) => {
      const listToFilter = [...prevItems];

      const finalList = listToFilter.filter((item) => item.id !== id);

      return finalList;
    });
  };

  const deleteItem = (itemId: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(serverURL + "/api/deleteListItem", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listId,
            itemId,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          // DATA => ITEM Q FOI CRIADO
          callUpdateItemSocket(data.item, "delete");

          toast({
            description: "Item deletado!",
          });

          setFilteredListItems((prevItems) => {
            const finalList = prevItems.filter(
              (e) => e.id.toString() !== itemId
            );

            return finalList;
          });

          resolve();
        } else {
          const error = await response.json();
          console.error("Error delete list item:", error);
          reject(new Error(`Error deleting item: ${error.message}`));
        }
      } catch (error) {
        console.error("Error delete list item", error);
        reject(error);
      }
    });
  };

  const deleteList = () => {
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
            //console.log(data)

            const recents = localStorage.getItem("recents");
            if (recents) {
              const recentItems = JSON.parse(recents);

              const filteredRecents = recentItems.filter(
                (item: listItem) => item.id !== data.list.id
              );

              localStorage.setItem("recents", JSON.stringify(filteredRecents));
            }

            toast({
              description: "Lista deletada!",
              duration: 1500,
            });

            const storedUserId = localStorage.getItem("userId");
            if (storedUserId) {
              const query = new URLSearchParams({
                owner: storedUserId,
              }).toString();
              router.push(`/listas?${query}`);
            }

            resolve();
          } else {
            const error = await response.json();
            //console.error("Error delete list:", error);

            toast({
              variant: "destructive",
              description: error.error,
            });
            reject();
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
      <NavListas
        listId={listId}
        title={listName ? listName : "Carregando..."}
        showBackBtn={true}
      >
        <CustomDropdown icon={<i className="bx bx-filter"></i>}>
          <DropdownMenuLabel>Ordenar</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">A - Z </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              Recentes
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </CustomDropdown>

        <CustomDropdown icon={<i className="bx bx-dots-vertical-rounded "></i>}>
          <DropdownMenuItem
            onClick={(e) => {
              deleteList();
            }}
          >
            Deletar Lista
          </DropdownMenuItem>
        </CustomDropdown>
      </NavListas>
      <main className="flex-grow bg-theme-gray relative overflow-x-clip">
        {isLoading && filteredListItems.length <= 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-14 h-14 border-8 text-theme-blue text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-theme-blue rounded-full"></div>
              Carregando...
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-6 h-full relative">
            {filteredListItems.length > 0 ? (
              filteredListItems.map((item: listItem) => {
                return (
                  <SwappItem item={item} onRemove={deleteItem} key={item.id}>
                    <div className="flex flex-row gap-2 items-center text-black">
                      <Checkbox
                        checked={item.marked}
                        onCheckedChange={(e) => updateItemMark(item.id, e)}
                      />
                      <Input
                        placeholder="Item..."
                        className="border-0 ring-0 p-0 text-md focus-visible:p-0 placeholder:text-black focus-visible:ring-0 focus-visible:ring-offset-0 h-[24px] w-auto"
                        onChange={(e) => {
                          updateLocalItemName(item.id, e.target.value);
                        }}
                        onBlur={(e) => {
                          syncDbItemName(item.id, e.target.value);
                        }}
                        value={item.name}
                      />
                    </div>

                    <i className="bx bx-dots-vertical-rounded text-sm"></i>
                  </SwappItem>
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
              {filteredListItems && filteredListItems.length > 0 ? (
                ""
              ) : (
                <div className="absolute top-[10%] left-[-5%] rotate-[-20deg]">
                  <Image
                    src={arrowImage}
                    alt="click arrow"
                    width={160}
                    height={160}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
