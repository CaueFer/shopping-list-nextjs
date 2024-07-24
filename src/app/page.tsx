"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bannerImg from "@/assets/imgs/banner.png";

export default function Home() {
  const [socket, setSocket] = useState<any>(undefined);
  const [inbox, setInbox] = useState<{ message: string }[]>([]);

  const [message, setMessage] = useState("");

  // ROOM SETTINGS
  const [joinRoomName, setJoinRoomName] = useState("");
  const [joinRoomPassword, setJoinRoomPassword] = useState("");
  const [joinedRoomName, setJoinedRoomName] = useState("");

  const [createRoomName, setCreateRoomName] = useState("");
  const [createRoomPassword, setCreateRoomPassword] = useState("");

  // HELPERS
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("message", message, joinedRoomName);
      setMessage("");
    } else {
      setError("Digite uma mensagem.");
    }
  };

  const handleJoinRoom = () => {
    if (
      socket &&
      joinRoomName.trim() !== "" &&
      joinRoomPassword.trim() !== ""
    ) {
      socket.emit("joinRoom", joinRoomName, joinRoomPassword);
      setError(null);
    } else {
      setError("Digite o nome e senha válidos");
    }
  };

  const handleCreateRoom = () => {
    if (
      socket &&
      createRoomName.trim() !== "" &&
      createRoomPassword.trim() !== ""
    ) {
      socket.emit("createRoom", createRoomName, createRoomPassword);
      setError(null);
    } else {
      setError("Digite o nome valido.");
    }
  };

  useEffect(() => {
    const socketServer = io("http://localhost:3001");

    socketServer.on("message", (message: string) => {
      setInbox((prevInbox) => [...prevInbox, { message }]);
    });

    socketServer.on("error", (errorMessage: string) => {
      setError(errorMessage);
    });

    socketServer.on("joinedRoom", (joinedRoom: string) => {
      setJoinedRoomName(joinedRoom);
    });

    setSocket(socketServer);

    return () => {
      socketServer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      {/* <div className="flex flex-col gap-6 border rounded-lg p-10 w-full">
        {inbox.map((msg, index) => (
          <div key={index} className="border rounded px-4 py-2">
            {msg.message}
          </div>
        ))}
      </div> */}

      {/* <div className="flex gap-2 align-center justify-center">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          name="message"
          value={message}
          className="flex-1 bg-black border rounded px-2 py-1"
        />
        <button className="w-40" onClick={handleSendMessage}>
          Enviar
        </button>
      </div> */}

      <div className="flex flex-col gap-6 border rounded-lg w-full h-[160px] relative">
        <Image
          className="w-full h-full rounded-lg object-cover"
          src={bannerImg}
          fill
          alt="banner app"
        />
      </div>

      <div className="flex flex-col gap-4 align-center justify-start mt-6">
        <h2>Entrar em uma Lista Compartilhada</h2>

        <div className="flex flex-col gap-4 justify-start">
          <Input
            onChange={(e) => setJoinRoomName(e.target.value)}
            type="text"
            name="room"
            placeholder="Nome da Lista"
            className="w-auto"
          />
          {/* Exibir mensagem de erro */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {/* Exibir sala conectada */}
          {joinedRoomName && (
            <div className="text-indigo">{`Sala atual: ${joinedRoomName}`}</div>
          )}
          <Input
            onChange={(e) => setJoinRoomPassword(e.target.value)}
            type="text"
            name="roompass"
            placeholder="Senha"
            className="w-auto"
          />
          <Button className="" onClick={handleJoinRoom}>
            Entrar
          </Button>
        </div>
      </div>

      {/* <div className="flex gap-4 align-center justify-center mt-2">
        <input
          onChange={(e) => setCreateRoomName(e.target.value)}
          type="text"
          name="room"
          className="flex-1 bg-black border rounded px-2 py-1"
        />
        <input
          onChange={(e) => setCreateRoomPassword(e.target.value)}
          type="text"
          name="roompass"
          className="flex-1 bg-black border rounded px-2 py-1"
        />
        <button className="w-40" onClick={handleCreateRoom}>
          Criar Sala
        </button>
      </div> */}
    </div>
  );
}
