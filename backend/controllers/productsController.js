const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllproduct = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    // Group products by name
    const groupedProducts = products.reduce((acc, product) => {
      const existingProduct = acc.find((item) => item.name === product.name);
      if (existingProduct) {
        existingProduct.variants.push({
          productId: product.productId,
          diffrentby: product.diffrentby,
          sessions: product.sessions,
          cost: product.cost,
        });
      } else {
        acc.push({
          name: product.name,
          imgsrc: product.imgsrc,
          description: product.description,
          variants: [
            {
              productId: product.productId,
              diffrentby: product.diffrentby,
              sessions: product.sessions,
              cost: product.cost,
            },
          ],
        });
      }
      return acc;
    }, []);

    res.status(200).json(groupedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const email = req.email;

    // Check if the product with the provided ID exists in the database
    const product = await prisma.product.findUnique({
      where: {
        productId,
      },
    });

    // If product is not found, return 404 status code with a message
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Retrieve the user from the database based on the email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user is not found, return 404 status code with a message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse the user's cart string into an array of objects
    const cart = JSON.parse(user.cart || "[]");

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, increment its quantity
      cart[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not already in the cart, add it with a quantity of 1
      cart.push({ id: productId, quantity: quantity });
    }

    // Convert the updated cart array back to a string
    const updatedCart = JSON.stringify(cart);

    // Update the user's cart in the database
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        cart: updatedCart,
      },
    });

    // Return success response
    return res
      .status(200)
      .json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const email = req.email;

    // Retrieve the user from the database based on the email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user is not found, return 404 status code with a message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = JSON.parse(user.cart || "[]");
    const cartWithQuantity = [];

    // Loop through each item in the cart
    for (const item of cart) {
      // Retrieve product details from the database based on the product ID
      const product = await prisma.product.findUnique({
        where: {
          productId: item.id,
        },
      });

      // If product is found, add it to the cart with quantity
      if (product) {
        cartWithQuantity.push({
          ...product,
          quantity: item.quantity,
        });
      }
    }

    // Return the user's cart with quantity
    return res.status(200).json(cartWithQuantity);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const email = req.email;

    // Check if the product with the provided ID exists in the database
    const product = await prisma.product.findUnique({
      where: {
        productId,
      },
    });

    // If product is not found, return 404 status code with a message
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Retrieve the user from the database based on the email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If user is not found, return 404 status code with a message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse the user's cart string into an array of objects
    let cart = JSON.parse(user.cart || "[]");

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (quantity === 0) {
      // If quantity is 0, remove the item from the cart
      if (existingProductIndex !== -1) {
        cart.splice(existingProductIndex, 1);
      }
    } else {
      if (existingProductIndex !== -1) {
        // If the product already exists, update its quantity
        cart[existingProductIndex].quantity = quantity;
      } else {
        // If the product is not already in the cart, add it
        cart.push({ id: productId, quantity: quantity });
      }
    }

    // Convert the updated cart array back to a string
    const updatedCart = JSON.stringify(cart);

    // Update the user's cart in the database
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        cart: updatedCart,
      },
    });

    // Return success response
    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUserCart, getAllproduct, addProductToCart, updateCart };
