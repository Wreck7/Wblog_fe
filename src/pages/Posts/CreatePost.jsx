import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axiosClient from "../../utils/axiosClient"; // adjust path if needed
import CategorySelect from "../../components/CategorySelect"; // adjust path if needed

export default function CreatePost() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("category_id", category);
    if (imageFile) formData.append("file", imageFile);

    try {
      setLoading(true);
      const { data } = await axiosClient.post("/posts/", formData);

      toast.success("Post created successfully!");
      // console.log("✅ Post created:", data);

      // reset form
      setTitle("");
      setDescription("");
      setCategory("all");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E0] py-4 px-2 sm:py-8 sm:px-6 font-serif">
      <div className="max-w-3xl mx-auto border-4 border-stone-900 shadow-[6px_6px_0px_#000] bg-[#FFFBEA] p-4 sm:p-10 relative">
        {/* Retro Header */}
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="text-xl sm:text-4xl uppercase font-extrabold tracking-widest text-center mb-4 sm:mb-8 border-b-4 border-stone-900 pb-1 sm:pb-2"
        >
          Create a Post
        </motion.h2>

        <form className="space-y-4 sm:space-y-8" onSubmit={handleSubmit}>
          {/* Upload Image */}
          <div>
            <label className="block text-sm sm:text-lg font-bold uppercase mb-2 sm:mb-3">
              Cover Image
            </label>
            <label
              htmlFor="imageUpload"
              className="block cursor-pointer border-4 border-dashed border-stone-900 bg-[#FDF6E3] p-4 sm:p-10 text-center shadow-[5px_5px_0px_#000] hover:translate-x-1 hover:-translate-y-1 transition-transform"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto max-h-40 sm:max-h-64 object-contain border-2 border-stone-900 shadow-[3px_3px_0px_#000]"
                />
              ) : (
                <p className="font-semibold text-stone-700 text-xs sm:text-base">
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
            <label className="block text-sm sm:text-lg font-bold uppercase mb-2 sm:mb-3">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-4 border-stone-900 bg-[#FFF] shadow-[4px_4px_0px_#000] focus:outline-none text-sm sm:text-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm sm:text-lg font-bold uppercase mb-2 sm:mb-3">
              Category
            </label>
            <CategorySelect value={category} onChange={setCategory} />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm sm:text-lg font-bold uppercase mb-2 sm:mb-3">
              Description
            </label>
            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your post description here..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-4 border-stone-900 bg-[#FFF] shadow-[4px_4px_0px_#000] focus:outline-none text-xs sm:text-base leading-relaxed"
            ></textarea>
          </div>

          {/* Publish Button */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-5 sm:px-8 py-2 sm:py-3 border-4 border-stone-900 bg-[#FAF3E0] font-bold uppercase text-sm sm:text-lg tracking-wider shadow-[5px_5px_0px_#000] hover:translate-x-1 hover:-translate-y-1 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish"}
          </motion.button>
        </form>

        {/* Retro paper overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 mix-blend-multiply pointer-events-none"></div>
      </div>
    </div>
  );
}
