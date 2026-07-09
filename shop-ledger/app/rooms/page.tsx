"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import {
  Globe2,
  Users,
  Mic,
  Plus,
  Languages,
  Sparkles,
} from "lucide-react";

const LANGUAGES = [
  { value: "ესპანური", label: "🇪🇸 ესპანური" },
  { value: "ინგლისური", label: "🇬🇧 ინგლისური" },
  { value: "ჩინური", label: "🇨🇳 ჩინური" },
  { value: "ქართული", label: "🇬🇪 ქართული" },
  { value: "ფრანგული", label: "🇫🇷 ფრანგული" },
];

export default function RoomsPage() {
  const { user } = useUser();
  const router = useRouter();

  const [language, setLanguage] = useState(LANGUAGES[0].value);
  const [maxParticipants, setMaxParticipants] = useState(4);
  const [creating, setCreating] = useState(false);

  const rooms = useQuery(api.rooms.listRoomsByLanguage, {
    language,
  });

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

  const glassCard = {
    boxShadow:
      "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(30,58,138,0.12)",
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#F5FAFF]" />
      <div className="pointer-events-none fixed -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-[#38BDF8]/20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-[#1E3A8A]/15 blur-3xl" />

      <section
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-[#1E3A8A]/85 via-[#38BDF8]/80 to-[#1E3A8A]/85 p-8 text-white backdrop-blur-xl"
        style={{
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.4) inset, 0 16px 40px -12px rgba(30,58,138,0.4)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
            <Languages />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              ივარჯიშეთ უცხოელებთან
            </h1>

            <p className="mt-2 text-white/80">
             შემოუერთდი ოთახებს, გაიცანი ახალი ადამიანები და გაიუმჯობესე შენი საუბრის დონე
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`
              rounded-full px-5 py-2 text-sm
              backdrop-blur
              transition
              border
              ${
                language === lang.value
                  ? "bg-white text-[#0C4A8C] border-white/60"
                  : "border-white/30 bg-white/15 hover:bg-white/25"
              }
              `}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </section>

      <section
        className="mx-auto mt-8 max-w-5xl rounded-3xl border border-white/50 bg-white/30 p-6 backdrop-blur-xl"
        style={glassCard}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#1E3A8A]/10 p-3 text-[#0C4A8C]">
            <Sparkles size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F2647]">
             დაიწყე საუბარი
            </h2>

            <p className="text-sm text-[#4A6B8C]">
              შექმენი შენი საკუთარი ოთახი
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <select
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            className="rounded-xl border border-white/60 bg-white/40 px-4 py-3 text-[#0F2647] backdrop-blur-sm outline-none focus:border-[#1E3A8A]/40"
          >
            {[2, 3, 4, 5, 6].map((n) => (
              <option key={n}>{n} ადამიანი</option>
            ))}
          </select>

          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1E3A8A]/85 to-[#38BDF8]/85 px-6 py-3 font-medium text-white backdrop-blur-xl border border-white/30 transition hover:from-[#1E3A8A] hover:to-[#38BDF8] disabled:opacity-50"
            style={{
              boxShadow:
                "0 1px 0 0 rgba(255,255,255,0.5) inset, 0 6px 20px -4px rgba(30,58,138,0.5)",
            }}
          >
            <Plus size={18} />
            {creating ? "იქმნება..." : `დაიწყეთ ${language} ენის ოთახი`}
          </button>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-5xl">
        <div className="mb-4 flex items-center gap-2 text-[#0F2647]">
          <Globe2 size={20} />
          <h2 className="text-xl font-semibold">ოთახები პირდაპირ ეთერში</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {rooms?.map((room) => (
            <div
              key={room._id}
              className="rounded-3xl border border-white/50 bg-white/30 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/40"
              style={glassCard}
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#38BDF8] text-xl text-white">
                    {room.hostName.charAt(0)}
                  </div>

                  <h3 className="mt-4 font-semibold text-[#0F2647]">
                    {room.hostName}-ს ოთახი
                  </h3>

                  <p className="mt-1 text-sm text-[#4A6B8C]">
                    საუბარი მიმდინარეობს {language} ენაზე
                  </p>
                </div>

                <div className="flex h-fit items-center gap-1 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1 text-xs text-[#15803D] backdrop-blur-sm">
                  <Mic size={13} />
                  პირდაპირი
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-[#4A6B8C]">
                  <Users size={16} />
                  {room.participantCount}/{room.maxParticipants}
                </div>

                <button
                  onClick={() => handleJoin(room._id)}
                  disabled={room.participantCount >= room.maxParticipants}
                  className="rounded-xl bg-gradient-to-r from-[#1E3A8A]/85 to-[#38BDF8]/85 px-5 py-2 text-sm text-white backdrop-blur-xl border border-white/30 hover:from-[#1E3A8A] hover:to-[#38BDF8] disabled:opacity-40"
                >
                  {room.participantCount >= room.maxParticipants
                    ? "სავსეა"
                    : "შეუერთდი"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {rooms?.length === 0 && (
          <div
            className="rounded-3xl border border-white/50 bg-white/30 p-10 text-center backdrop-blur-xl"
            style={glassCard}
          >
            <Globe2 className="mx-auto text-[#4A6B8C]" size={40} />
            <p className="mt-4 text-[#4A6B8C]">
              აქტიური ოთახები არ არის. იყავი პირველი
            </p>
          </div>
        )}
      </section>
    </main>
  );
}