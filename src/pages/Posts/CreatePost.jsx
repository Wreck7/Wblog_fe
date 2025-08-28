import { useState } from "react";
import { motion } from "framer-motion";

export default function CreatePost() {
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("all");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] py-12 px-6 font-serif">
      <div className="max-w-3xl mx-auto border-4 border-stone-900 shadow-[8px_8px_0px_#000] bg-[#FFFBEA] p-10 relative">

        {/* Retro Header */}
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-4xl uppercase font-extrabold tracking-widest text-center mb-8 border-b-4 border-stone-900 pb-2"
        >
          Create a Post
        </motion.h2>

        <form className="space-y-8">

          {/* Upload Image */}
          <div>
            <label className="block text-lg font-bold uppercase mb-3">
              Cover Image
            </label>
            <label
              htmlFor="imageUpload"
              className="block cursor-pointer border-4 border-dashed border-stone-900 bg-[#FDF6E3] p-10 text-center shadow-[5px_5px_0px_#000] hover:translate-x-1 hover:-translate-y-1 transition-transform"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto max-h-64 object-contain border-2 border-stone-900 shadow-[3px_3px_0px_#000]"
                />
              ) : (
                <p className="font-semibold text-stone-700">
                  Click here to upload an image
                </p>
              )}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-lg font-bold uppercase mb-3">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter your post title..."
              className="w-full px-4 py-3 border-4 border-stone-900 bg-[#FFF] shadow-[4px_4px_0px_#000] focus:outline-none text-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-bold uppercase mb-3">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border-4 border-stone-900 bg-[#FFFBEA] shadow-[4px_4px_0px_#000] text-stone-900 uppercase text-base font-bold tracking-wider cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-transform"
            >
              <option value="all">📰 All</option>
              <option value="tech">💻 Tech</option>
              <option value="lifestyle">🌿 Lifestyle</option>
              <option value="travel">✈️ Travel</option>
              <option value="retro">🎬 Entertainment</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-bold uppercase mb-3">
              Description
            </label>
            <textarea
              rows="6"
              placeholder="Write your post description here..."
              className="w-full px-4 py-3 border-4 border-stone-900 bg-[#FFF] shadow-[4px_4px_0px_#000] focus:outline-none text-base leading-relaxed"
            ></textarea>
          </div>

          {/* Publish Button */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="px-8 py-3 border-4 border-stone-900 bg-[#FAF3E0] font-bold uppercase text-lg tracking-wider shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:-translate-y-1 transition-transform"
          >
            Publish
          </motion.button>
        </form>

        {/* Retro paper overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 mix-blend-multiply pointer-events-none"></div>
      </div>
    </div>
  );
}
