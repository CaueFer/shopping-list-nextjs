"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Footer } from "./footer";

export default function Home() {
  const [socket, setSocket] = useState<any>(undefined);
  const [inbox, setInbox] = useState<{ message: string }[]>([
    { message: "hello" },
    { message: "nice" },
  ]);

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
      setError("Digite o nome de uma sala existente.");
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
    <main>
      <div className="flex flex-col gap-2 border rounded-lg lg:px-48">
        <div className="flex flex-col gap-6 border rounded-lg p-10 w-full">
          {inbox.map((msg, index) => (
            <div key={index} className="border rounded px-4 py-2">
              {msg.message}
            </div>
          ))}
        </div>

        {/* Exibir mensagem de erro */}
        {error && <div className="text-red-500">{error}</div>}

        {/* Exibir sala conectada */}
        {joinedRoomName && (
          <div className="text-indigo">{`Sala atual: ${joinedRoomName}`}</div>
        )}

        <div className="flex gap-2 align-center justify-center">
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
        </div>

        <div className="flex gap-4 align-center justify-center">
          <input
            onChange={(e) => setJoinRoomName(e.target.value)}
            type="text"
            name="room"
            className="flex-1 bg-black border rounded px-2 py-1"
          />
          <input
            onChange={(e) => setJoinRoomPassword(e.target.value)}
            type="text"
            name="roompass"
            className="flex-1 bg-black border rounded px-2 py-1"
          />
          <button className="w-40" onClick={handleJoinRoom}>
            Entra na Sala
          </button>
        </div>

        <div className="flex gap-4 align-center justify-center mt-2">
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
        </div>
      </div>

      <Footer />
    </main>
  );
}
