"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { AccessToken } from "livekit-server-sdk";


export const generateJoinToken = action({
  args: {
    roomId: v.string(), 
    identity: v.string(), 
    userName: v.string(),
},
  handler: async (ctx, { roomId, identity, userName }) => {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error(
        "LIVEKIT_API_KEY / LIVEKIT_API_SECRET are not set in Convex environment variables"
      );
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity,
      name: userName,
      ttl: "2h",
    });

    at.addGrant({
      roomJoin: true,
      room: roomId,
      canPublish: true,
      canSubscribe: true,
    });

    const token = await at.toJwt();
    return { token };
  },
});