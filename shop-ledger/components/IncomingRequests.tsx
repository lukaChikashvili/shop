
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Check, X } from "lucide-react";

export function IncomingRequests() {
  const requests = useQuery(api.community.getIncomingRequests);
  const respond = useMutation(api.community.respondToRequest);
  const { user } = useUser();
  const myName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  if (!requests || requests.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl">
      <h2 className="text-sm font-semibold text-[#0F2647]">მოწვევები</h2>
      <div className="mt-3 space-y-2">
        {requests.map((r) => (
          <div key={r._id} className="flex items-center justify-between rounded-xl bg-white/40 px-3 py-2">
            <span className="text-sm text-[#0F2647]">{r.requesterName}</span>
            <div className="flex gap-2">
              <button
                onClick={() => respond({ requestId: r._id, accept: true, myName })}
                className="rounded-full bg-green-500/10 p-1.5 text-green-700 hover:bg-green-500/20"
              >
                <Check size={14} />
              </button>
              <button
                onClick={() => respond({ requestId: r._id, accept: false, myName })}
                className="rounded-full bg-red-500/10 p-1.5 text-red-700 hover:bg-red-500/20"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}