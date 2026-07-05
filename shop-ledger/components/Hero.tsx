import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative px-6 py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
       
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light text-accent text-sm font-medium">
            <span>შექმნილია ქართული ბიზნესებისთვის</span> 🇬🇪
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            მართე შენი ბიზნესი ერთ სივრცეში
          </h1>
          
          <p className="text-lg text-gray-600 max-w-lg">
            საყიდლები, მარაგი, ხარჯები, მომხმარებლები და ანგარიშები – ყველაფერი მარტივად და გასაგებად.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="/register" 
              className="flex items-center gap-2 px-4 py-2 rounded-full 
              bg-accent text-white 
              border border-accent/20 
              hover:bg-accent/10 hover:text-accent hover:border-accent 
              transition-colors"
            >
              დაიწყე უფასო 7 დღიანი პერიოდი <ArrowRight size={20} />
            </Link>
            <button className="flex items-center gap-2 text-gray-700 px-6 py-4 rounded-full border border-gray-200 hover:bg-accent-light transition">
              <Play size={18} className="fill-gray-700" /> ნახე დემო
            </button>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden" />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-yellow-400">★★★★★</div>
              <span className="text-gray-600">500+ ბიზნესი უკვე იყენებს</span>
            </div>
          </div>
        </div>

        
        <div className="relative">
          <div className="relative z-10 bg-gray-900 p-2 rounded-2xl shadow-2xl">
             <div className="w-full h-80 md:h-96 bg-white rounded-xl flex items-center justify-center text-gray-400">
              
               [ Dashboard Mockup Illustration ]
             </div>
          </div>
         
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
        </div>

      </div>
    </section>
  );
}