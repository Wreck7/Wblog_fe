import { useEffect, useState } from "react";
import axios from "axios";

export default function CategorySelect({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend
    axios
      .get("https://wblog-be.onrender.com//categories") // adjust to your backend URL
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
      });
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border-4 border-stone-900 bg-[#FFFBEA] shadow-[4px_4px_0px_#000] text-stone-900 uppercase text-base font-bold tracking-wider cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-transform"
    >
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
