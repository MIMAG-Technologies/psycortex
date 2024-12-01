import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Products() {
  const [productList, setproductList] = useState([]);
  const [isFormOpen, setisFormOpen] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    Factor: "",
    diffrentby: "",
    sessions: 0,
    cost: 0,
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("psycortexAdminTOKEN");

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/getProducts/all`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setproductList(response.data.data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    if (!token) {
      navigate("/");
      return;
    }
    fetchProducts();
  }, [token, navigate]);

  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const url = editingProductId
      ? `${process.env.REACT_APP_API_URL}/admin/updateProduct/${editingProductId}`
      : `${process.env.REACT_APP_API_URL}/admin/createProduct`;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        alert(editingProductId ? "Product updated!" : "Product created!");
        setisFormOpen(false);
        setEditingProductId(null);
        setformData({
          name: "",
          Factor: "",
          diffrentby: "",
          sessions: 0,
          cost: 0,
          description: "",
        });
        setImageFile(null);
        // Refresh the product list
        const refreshedProducts = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/getProducts/all`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setproductList(refreshedProducts.data.data);
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Open form for editing
  const handleEdit = (product) => {
    setformData(product);
    setEditingProductId(product._id);
    setisFormOpen(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const url = `${process.env.REACT_APP_API_URL}/admin/deleteProducts/${product._id}`;
      try {
        const response = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          alert("Product deleted!");
          const updatedProducts = productList.filter((p) => p._id!== product._id);
          setproductList(updatedProducts);
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }else{
      console.log("Delete cancelled");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <button className="view-btn" onClick={() => setisFormOpen(true)}>
          Add Product
        </button>
      </div>
      {isFormOpen && (
        <div className="ProductForm">
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <span>
              <label>Product Name:</label>
              <input
                type="text"
                list="productNames"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <datalist id="productNames">
                {[...new Set(productList.map((product) => product.name))].map(
                  (uniqueName, index) => (
                    <option key={index} value={uniqueName} />
                  )
                )}
              </datalist>
            </span>
            <span>
              <label>Upload Image:</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </span>
            <span>
              <label>Factor:</label>
              <input
                type="text"
                name="Factor"
                value={formData.Factor}
                onChange={handleInputChange}
                required
              />
            </span>
            <span>
              <label>Different By:</label>
              <input
                type="text"
                name="diffrentby"
                value={formData.diffrentby}
                onChange={handleInputChange}
                required
              />
            </span>
            <span>
              <label>Sessions:</label>
              <input
                type="number"
                name="sessions"
                value={formData.sessions}
                onChange={handleInputChange}
                required
              />
            </span>
            <span>
              <label>Cost:</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                required
              />
            </span>
            <span
              style={{
                gridColumn: "span 2",
              }}
            >
              <label>Description:</label>
              <textarea
                style={{
                  height: "100px",
                  padding: "2px",

                  resize: "none",
                }}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </span>
            <button type="submit">
              {editingProductId ? "Update Product" : "Create Product"}
            </button>
            <button type="button" onClick={() => setisFormOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <div className="Products-Container">
        {productList.map((product) => (
          <div className="one-adminproduct" key={product._id}>
            <h2>{product.name}</h2>
            <img
              src={process.env.REACT_APP_API_URL + product.imgsrc}
              alt={product.name}
            />
            <p>Factor: {product.Factor}</p>
            <p>Different By: {product.diffrentby}</p>
            <p>Sessions: {product.sessions}</p>
            <p>Cost: {product.cost}</p>
            <button className="view-btn" onClick={() => handleEdit(product)}>
              Edit
            </button>
            <button className="view-btn" onClick={() => handleDelete(product)}>
              Delete
            </button>
            <button
              className="view-btn"
              onClick={() => navigate(`/shop/products/${product.name}`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
