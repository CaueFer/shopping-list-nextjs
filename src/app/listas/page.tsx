"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ListasPage() {
  const [socket, setSocket] = useState<any>(undefined);
  const serverURL = "http://localhost:3001";

  // ROOM SETTINGS
  const [joinListName, setJoinListName] = useState("");
  const [joinListPassword, setJoinListPassword] = useState("");
  const [joinedRoomName, setJoinedListName] = useState("");

  const [createListName, setCreateListName] = useState("");
  const [createListPassword, setCreateListPassword] = useState("");

  // HELPERS
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const [lists, setLists] = useState([]);

  const getLists = async () => {
    try {
      const response = await fetch(serverURL + "/api/getList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);
        setLists(data);
        setIsLoading(false);
      } else {
        const error = await response.json();
        console.error("Error get list:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error get lists", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const socketServer = io("http://localhost:3001");

    socketServer.on("error", (errorMessage: string) => {
      setIsLoading(false);
      setError(errorMessage);
    });

    socketServer.on("joinedList", (joinedList: string) => {
      setIsLoading(false);
      setJoinedListName(joinedList);
    });

    // socket.on("itemUpdated", (updatedItem) => {
    //   // Atualize a interface do usuário com o item atualizado
    // });

    setSocket(socketServer);

    return () => {
      socketServer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      <h1>Teste</h1>
    </div>
  );
}
