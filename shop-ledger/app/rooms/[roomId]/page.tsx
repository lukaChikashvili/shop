"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAction, useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  useTracks,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import "@livekit/components-styles";

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const { user } = useUser();

  const room = useQuery(api.rooms.getRoom, { roomId: roomId as any });
  const generateJoinToken = useAction(api.livekit.generateJoinToken);
  const leaveRoom = useMutation(api.rooms.leaveRoom);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !roomId) return;
    generateJoinToken({
      roomId,
      identity: user.id,
      userName: user.fullName ?? user.username ?? "Anonymous",
    }).then((res) => setToken(res.token));
  }, [user, roomId]);

  async function handleLeave() {
    await leaveRoom({ roomId: roomId as any });
    router.push("/rooms");
  }

  if (room === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-neutral-500">This room no longer exists.</p>
      </div>
    );
  }

  if (!token || !room) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-neutral-500">Connecting…</p>
      </div>
    );
  }

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-lg">
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={serverUrl}
          connect={true}
          data-lk-theme="default"
          style={{ height: "560px" }}
          onDisconnected={handleLeave}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2 text-sm text-neutral-300">
              <span className="capitalize">{room.language} room</span>
              <span>
                {room.participants.length}/{room.maxParticipants}
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <MyVideoConference />
            </div>
            <RoomAudioRenderer />
            <ControlBar controls={{ leave: true }} onDeviceError={console.error} />
          </div>
        </LiveKitRoom>
      </div>
    </div>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout tracks={tracks} style={{ height: "100%" }}>
      <ParticipantTile />
    </GridLayout>
  );
}