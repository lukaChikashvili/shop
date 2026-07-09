import { CommunitySearch } from "@/components/CommunitySearch";

export default function CommunityPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-[#0F2647]">
        საზოგადოება
      </h1>
      <p className="mt-0.5 text-sm text-[#4A6B8C]">
        იპოვე ახალი მეგობრები ენების გაცვლისთვის.
      </p>

      <div className="mt-6">
        <CommunitySearch />
      </div>
    </div>
  );
}