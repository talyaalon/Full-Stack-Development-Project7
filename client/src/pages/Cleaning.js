import React, { useEffect, useState } from "react";
import "./Basic.css";

const QuantityCounter = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className="quantity-counter">
      <div className="counter-buttons">
        <button className="circle-button" onClick={onDecrement}>
          -
        </button>
        <div className="counter-value">{value}</div>
        <button className="circle-button" onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default function Cleaning() {
  var user = JSON.parse(localStorage.getItem("currentUser"));
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product
  const [isEditing, setIsEditing] = useState(false); // State to track whether the product is being edited
  const [updatedProduct, setUpdatedProduct] = useState(null); // State to store the updated product data
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({}); // State to store the updated product data

  const [quantity, setQuantity] = useState(1); // State to store the quantity

  // Function to increment the quantity by 1
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrement the quantity by 1, but ensuring it doesn't go below 1
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/cleaning`);
        const data = await response.json();
        setLoadedProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({ ...product }); // Make a copy of the product data for editing
    setIsEditing(false); // Reset the editing state when the modal is opened
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setIsEditing(false); // Reset the editing state when the modal is closed
    setQuantity(1);
  };

  const handleEditProduct = () => {
    setIsEditing(true);
  };

  const handleAddToShoppingCart = async (product) => {
    var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    shoppingCart.push({
      product_name: product.name,
      product_price: product.price,
      product_img: product.image_url,
      product_quantity: quantity,
    });
    var shoppingCartJson = JSON.stringify(shoppingCart);
    localStorage.setItem("shoppingCart", shoppingCartJson);
    const newQuantity = product.quantity - quantity;

    try {
      const response = await fetch(
        `http://localhost:3000/cleaning/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("new product:");
        console.log(data);
        setLoadedProducts((prevProducts) =>
          prevProducts.map((prod) => (prod.id === product.id ? data : prod))
        );
      } else {
        console.error("Error updating product:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleDeleteProduct = (id) => {
    try {
      fetch(`http://localhost:3000/cleaning/${id}`, {
        method: "DELETE",
      });

      // Update the local state to remove the deleted product
      setLoadedProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      // Close the modal if the deleted product is the currently selected product
      if (selectedProduct && selectedProduct.id === id) {
        setSelectedProduct(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedProduct(null);
    setUpdatedProduct({}); // Reset the updated product data
  };

  const handleSaveChanges = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/cleaning/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setLoadedProducts((prevProducts) =>
          prevProducts.map((prod) => (prod.id === id ? updatedProduct : prod))
        );
      } else {
        console.error("Error updating product:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // After saving changes, close the modal and reset the state
    setSelectedProduct(null);
    setIsEditing(false);
    setUpdatedProduct(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddNewProduct = () => {
    setIsNewProductModalOpen(true);
  };

  const handleCancelNewProduct = () => {
    setIsNewProductModalOpen(false);
    setNewProduct({});
  };

  const handleSaveNewProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cleaning`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("new product:");
        console.log(data);
        setLoadedProducts((prevProducts) => [...prevProducts, data]);
      } else {
        console.error("Error adding new product:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setIsNewProductModalOpen(false);
    setNewProduct({});
  };

  return (
    <div className="photos-container" lang="he" dir="rtl">
      <h1>מוצרי ניקיון</h1>
      {user.user_rank === "admin" && (
        <button className="add-product-btn" onClick={handleAddNewProduct}>
          הוספת מוצר חדש
        </button>
      )}
      <div className="photo-grid">
        {loadedProducts.map((product) => (
          <div
            className="photo-item"
            key={product.id}
            onClick={() => openProductModal(product)}
          >
            <div className="photo-frame">
              <img src={product.image_url} alt={product.name} />
            </div>
            <div className="photo-overlay">
              <span className="photo-title">{product.name}</span>
              <br></br>
              <span className="photo-title">מחיר: {product.price}₪</span>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeProductModal}>
              &times;
            </span>
            {isEditing ? (
              <>
                <h2>עריכת מוצר</h2>
                <div>
                  <label htmlFor="name">שם:</label>
                  <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="price">מחיר:</label>
                  <input
                    type="text"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="quantity">כמות במלאי:</label>
                  <input
                    type="text"
                    name="quantity"
                    value={updatedProduct.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="category">מחלקה:</label>
                  <input
                    type="text"
                    name="category"
                    value={updatedProduct.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="image_url">קישור לתמונה:</label>
                  <input
                    type="text"
                    name="image_url"
                    value={updatedProduct.image_url}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="button-container">
                  <button onClick={() => handleSaveChanges(selectedProduct.id)}>
                    שמירת השינויים
                  </button>
                  <button onClick={handleCancelEdit}>ביטול</button>
                </div>
              </>
            ) : (
              <>
                <h2>{selectedProduct.name}</h2>
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                />
                <h3>מחיר: {selectedProduct.price}₪</h3>
                <h3>כמות במלאי: {selectedProduct.quantity}</h3>
                <h3>מחלקה: {selectedProduct.category}</h3>
                {user.user_rank === "admin" && (
                  <div className="button-container">
                    <button onClick={handleEditProduct}>עריכה</button>
                    <button
                      onClick={() => handleDeleteProduct(selectedProduct.id)}
                    >
                      מחיקה
                    </button>
                  </div>
                )}
                {user.user_rank === "user" && (
                  <div>
                    <QuantityCounter
                      value={quantity}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                    />
                    <button
                      onClick={() => handleAddToShoppingCart(selectedProduct)}
                    >
                      הוספה לסל
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {/* New Product Modal */}
      {isNewProductModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelNewProduct}>
              &times;
            </span>
            <h2>הוספת מוצר חדש</h2>
            <div>
              <label htmlFor="name">שם:</label>
              <input
                type="text"
                name="name"
                value={newProduct.name || ""}
                onChange={handleAddInputChange}
              />
            </div>
            <div>
              <label htmlFor="price">מחיר:</label>
              <input
                type="text"
                name="price"
                value={newProduct.price || ""}
                onChange={handleAddInputChange}
              />
            </div>
            <div>
              <label htmlFor="quantity">כמות במלאי:</label>
              <input
                type="text"
                name="quantity"
                value={newProduct.quantity || ""}
                onChange={handleAddInputChange}
              />
            </div>
            <div>
              <label htmlFor="category">מחלקה:</label>
              <input
                type="text"
                name="category"
                value={newProduct.category || ""}
                onChange={handleAddInputChange}
              />
            </div>
            <div>
              <label htmlFor="image_url">קישור לתמונה:</label>
              <input
                type="text"
                name="image_url"
                value={newProduct.image_url || ""}
                onChange={handleAddInputChange}
              />
            </div>
            <div className="button-container">
              <button onClick={handleSaveNewProduct}>הוספה</button>
              <button onClick={handleCancelNewProduct}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
