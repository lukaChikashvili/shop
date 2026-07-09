import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Check, Clock, UserPlus } from "lucide-react";

function InviteButton({
    person,
    myName,
  }: {
    person: {
      userId: string;
      isConnected: boolean;
      requestStatus: { status: string; direction: string } | null;
    };
    myName: string;
  }) {
    const sendConnectionRequest = useMutation(api.community.sendConnectionRequest);
  
    if (person.isConnected) {
      return (
        <button
          disabled
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-green-500/10 px-3 py-2 text-xs font-semibold text-green-700"
        >
          <Check size={14} /> დაკავშირებული
        </button>
      );
    }
  
    if (person.requestStatus?.status === "pending") {
      return (
        <button
          disabled
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/60 bg-white/40 px-3 py-2 text-xs font-medium text-[#4A6B8C]"
        >
          <Clock size={14} />
          {person.requestStatus.direction === "outgoing" ? "მოწვევა გაგზავნილია" : "მოგელოდებათ პასუხი"}
        </button>
      );
    }
  
    return (
      <button
        onClick={() => sendConnectionRequest({ recipientId: person.userId, requesterName: myName })}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#1E3A8A]/85 to-[#38BDF8]/85 px-3 py-2 text-xs font-semibold text-white hover:from-[#1E3A8A] hover:to-[#38BDF8]"
      >
        <UserPlus size={14} /> მოწვევა
      </button>
    );
  }