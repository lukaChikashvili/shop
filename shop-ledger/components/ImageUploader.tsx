
"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Camera } from "lucide-react";

export function ImageUploader({
  kind,
  className,
  children,
}: {
  kind: "avatar" | "banner";
  className?: string;
  children?: React.ReactNode;
}) {
  const generateUploadUrl = useMutation(api.profileImages.generateUploadUrl);
  const setProfileImage = useMutation(api.profileImages.setProfileImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();
      await setProfileImage({ storageId, kind });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <label className={`cursor-pointer ${className ?? ""}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
        disabled={uploading}
      />
      {children ?? (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
          <Camera size={16} />
        </div>
      )}
    </label>
  );
}