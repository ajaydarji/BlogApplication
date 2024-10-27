import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const { blogs, setBlogs } = useAuth();
  console.log(blogs);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null); // Only for new file
  const [blogImagePreview, setBlogImagePreview] = useState(""); // URL or preview

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setTitle(data.title);
        setCategory(data.category);
        setAbout(data.about);
        setBlogImagePreview(data.blogImage?.url || ""); // Set preview to existing image URL
      } catch (error) {
        console.log(error);
        toast.error("Failed to load blog details.");
      }
    };
    fetchBlog();
  }, [id]);

  // Handle image selection
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result); // Update preview for selected file
        setBlogImage(file); // Update blogImage with file
      };
    }
  };

  // Update blog details
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    // Only add blogImage if a new file is selected
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <section className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="w-full p-2 mb-4 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 font-semibold">BLOG IMAGE</label>
              <img
                src={blogImagePreview || "/imgPL.webp"}
                alt="Blog Main"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <input
                type="file"
                className="w-full p-2 border rounded-md"
                onChange={changePhotoHandler}
              />
            </div>
            <textarea
              rows="6"
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Something about your blog at least 200 characters!"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UpdateBlog;
