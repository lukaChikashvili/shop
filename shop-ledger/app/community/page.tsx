import { CommunitySearch } from "@/components/CommunitySearch";

export default function CommunityPage() {
  return (
    // სუფთა, პრემიუმ ფონი ნაზი ლურჯი/ციანისფერი განათებებით ზუსტად ისე, როგორც სკრინშოტზეა
    <div className="relative min-h-screen w-full overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-8">
      {/* უკანა ფონის რბილი ნათებები (Ambient Orbs) */}
      <div className="absolute right-[-10%] top-[-5%] -z-10 h-[600px] w-[600px] rounded-full bg-[#E0F2FE]/60 blur-[120px]" />
      <div className="absolute left-[-5%] top-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-[#EEF2FF]/70 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        {/* ჰედერის სექცია */}
        <header className="mb-10 text-center">
          {/* პატარა ზედა ბეიჯი */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-4 py-1.5 text-xs font-medium text-[#1E40AF] border border-[#DBEAFE]">
            ✨ იპოვე იდეალური პარტნიორი პრაქტიკისთვის
          </div>
          
          {/* მთავარი სათაური LinguaRoom-ის სტილში */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl">
            ჩვენი <span className="bg-gradient-to-r from-[#1D4ED8] to-[#38BDF8] bg-clip-text text-transparent">საზოგადოება</span>
          </h1>
          
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#475569]">
            შემოუერთდი ცოცხალ სასაუბრო გარემოს, გაიცანი მშობლიურ ენოვანი თანამოსაუბრეები და ივარჯიშე რეალურ დროში.
          </p>
        </header>

        {/* ძებნის კომპონენტი */}
        <main>
          <CommunitySearch />
        </main>
      </div>
    </div>
  );
}