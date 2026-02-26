import React, { useState,  useEffect } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: ""
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products");

      const data = await res.json();
      setProducts(data.products); // IMPORTANT FIX

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle Create & Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editId) {
        // UPDATE
        await fetch(`https://dummyjson.com/products/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        setEditId(null);
      } else {
        // CREATE
        await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
      }

      setForm({ name: "", price: "", category: "" });
      fetchProducts();
      setLoading(false);
    } catch (err) {
      setError("Operation failed");
      setLoading(false);
    }
  };

  // Edit Product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category
    });
    setEditId(product._id);
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE"
      });
      fetchProducts();
      setLoading(false);
    } catch (err) {
      setError("Delete failed");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product CRUD</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <hr />

      <h3>Product List</h3>

      {products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        products.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <p>
              <strong>{item.name}</strong> — ₹{item.price} — {item.category}
            </p>

            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Product;