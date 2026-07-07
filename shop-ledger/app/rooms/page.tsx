"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

const LANGUAGES = [
  { value: "spanish", label: "Spanish" },
  { value: "english", label: "English" },
  { value: "chinese", label: "Chinese" },
  { value: "georgian", label: "Georgian" },
  { value: "french", label: "French" },
];

export default function RoomsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [language, setLanguage] = useState(LANGUAGES[0].value);
  const [maxParticipants, setMaxParticipants] = useState(4);
  const [creating, setCreating] = useState(false);

  const rooms = useQuery(api.rooms.listRoomsByLanguage, { language });
  const createRoom = useMutation(api.rooms.createRoom);
  const joinRoom = useMutation(api.rooms.joinRoom);

  async function handleCreate() {
    if (!user) return;
    setCreating(true);
    try {
      const roomId = await createRoom({
        language,
        hostName: user.fullName ?? user.username ?? "Anonymous",
        maxParticipants,
      });
      router.push(`/rooms/${roomId}`);
    } finally {
      setCreating(false);
    }
  }

  async function handleJoin(roomId: string) {
    if (!user) return;
    await joinRoom({
      roomId: roomId as any,
      userName: user.fullName ?? user.username ?? "Anonymous",
    });
    router.push(`/rooms/${roomId}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Practice rooms</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Join a live conversation room, or start one for others to find.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {LANGUAGES.map((l) => (
          <button
            key={l.value}
            onClick={() => setLanguage(l.value)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              language === l.value
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-neutral-200 p-4">
        <div className="flex-1">
          <label className="block text-xs font-medium text-neutral-500">
            Room size
          </label>
          <select
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            className="mt-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
          >
            {[2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} people
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {creating ? "Creating…" : `Start a ${language} room`}
        </button>
      </div>

      <div className="mt-8 space-y-2">
        {rooms === undefined && (
          <p className="text-sm text-neutral-400">Loading rooms…</p>
        )}
        {rooms?.length === 0 && (
          <p className="text-sm text-neutral-400">
            No open {language} rooms right now — start one above.
          </p>
        )}
        {rooms?.map((room) => (
          <div
            key={room._id}
            className="flex items-center justify-between rounded-xl border border-neutral-200 p-4"
          >
            <div>
              <p className="font-medium">{room.hostName}'s room</p>
              <p className="text-sm text-neutral-500">
                {room.participantCount}/{room.maxParticipants} in room ·{" "}
                {room.status === "waiting" ? "waiting for others" : "in progress"}
              </p>
            </div>
            <button
              onClick={() => handleJoin(room._id)}
              disabled={room.participantCount >= room.maxParticipants}
              className="rounded-lg border border-neutral-900 px-4 py-1.5 text-sm font-medium disabled:opacity-40"
            >
              {room.participantCount >= room.maxParticipants ? "Full" : "Join"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}