"use client";

export default function CreateShopPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">ახალი მაღაზიის დამატება</h1>
        
        <form className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">მაღაზიის სახელი</label>
            <input 
              name="name"
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" 
              placeholder="მაგ: ჩემი მაღაზია" 
              required
            />
          </div>
          
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">სფერო</label>
            <select name="category" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
              <option value="clothing">ტანსაცმელი</option>
              <option value="electronics">ტექნიკა</option>
              <option value="food">საკვების ობიექტი</option>
            </select>
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ქალაქი</label>
            <input 
              name="city"
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" 
              placeholder="მაგ: თბილისი" 
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            მაღაზიის შექმნა
          </button>
        </form>
      </div>
    </main>
  );
}