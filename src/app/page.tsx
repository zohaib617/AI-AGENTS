"use client";

import { useState } from "react";

export default function ProductAudienceForm() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [htmlResponse, setHtmlResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.trim() || !audience.trim()) {
      alert("Please fill in both fields!");
      return;
    }

    const payload = [
      {
        Product: product,
        Audience: audience,
        submittedAt: new Date().toISOString(),
        formMode: "test",
      },
    ];

    setLoading(true);
    setHtmlResponse("");

    try {
      const res = await fetch(
        "https://zs786zohan.app.n8n.cloud/webhook/chatapp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // ✅ webhook text response (HTML string)
      const html = await res.text();
      setHtmlResponse(html);
    } catch (error) {
      console.error(error);
      setHtmlResponse(
        "<p style='color:red;text-align:center;'>⚠️ Error loading post from webhook.</p>"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚀 Post Generator
      </h1>

      {/* ==== FORM ==== */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col space-y-4"
      >
        <div>
          <label className="block mb-2 font-semibold">Product</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Enter product name..."
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Audience</label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Enter target audience..."
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 rounded-lg py-2 font-semibold mt-2 disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </form>

      {/* ==== OUTPUT ==== */}
      <div className="mt-10 w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-lg">
        {loading && (
          <div className="text-gray-600 text-center py-10">
            Please wait, generating your post...
          </div>
        )}

        {/* Render the HTML response from n8n */}
        {!loading && htmlResponse && (
          <div
            className="p-0 text-black"
            dangerouslySetInnerHTML={{ __html: htmlResponse }}
          />
        )}
      </div>
         {/* 👇 Ye line yahan add karo */}
      <p className="mt-10 text-gray-400 text-sm text-center">
        Created by <span className="font-semibold text-white">Zohaib Shah</span>
      </p>
    </div>
  );
}
