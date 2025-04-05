const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();

const app = express();
app.use(express.json());
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }));
app.use(cookieParser());

const JWT_SECRET = "12345678";

mongoose.connect(
  "mongodb+srv://ab2091:abdullah2091@cluster0.x7skiwg.mongodb.net/DoorDashDB",
  { connectTimeoutMS: 30000 }
);

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  type: { type: String, enum: ["user", "admin"], default: "user" },
});
const User = mongoose.model("User", UserSchema);

const RestaurantSchema = new mongoose.Schema({
  restaurantId: { type: String, unique: true },
  name: String,
  location: String,
  manager: String,
  menu: [
    {
      item: String,
      price: Number,
    },
  ],
});
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

const createAdmin = async () => {
  const adminExists = await User.findOne({ username: "admin" });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({ name: "Admin", username: "admin", password: hashedPassword, type: "admin" });
    console.log("Admin created: username: admin, password: admin123");
  }
};
createAdmin();

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.json({ success: false, message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, type: user.type }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("username", username, { httpOnly: true, sameSite: "Strict", maxAge: 3600000 });

  res.json({ success: true, token });
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("username");
  res.json({ success: true, message: "Logged out successfully" });
});

app.post("/api/restaurants", async (req, res) => {
  try {
    const { restaurantId, name, location, manager, menu } = req.body;

    const existingRestaurant = await Restaurant.findOne({ restaurantId });
    if (existingRestaurant) {
      return res.status(400).json({ success: false, message: "Restaurant ID already exists." });
    }

    const restaurant = new Restaurant({ restaurantId, name, location, manager, menu });
    await restaurant.save();
    res.json({ success: true, message: "Restaurant added successfully!" });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ success: false, message: "Failed to add restaurant." });
  }
});

app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants" });
  }
});

app.put("/api/restaurants/:_id", async (req, res) => {
    try {
        const { restaurantId,name, location, manager, menu } = req.body;

        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            { _id: req.params._id },
            { restaurantId,name, location, manager, menu },
            { new: true } 
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        res.json({ success: true, message: "Restaurant updated successfully!", restaurant: updatedRestaurant });
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ success: false, message: "Error updating restaurant" });
    }
});

app.get("/api/restaurants/:id", async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      
      res.json(restaurant);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      res.status(500).json({ message: "Error fetching restaurant" });
    }
  });

  


  
  app.delete("/api/restaurants/:_id", async (req, res) => {
    try {
        
      const result = await Restaurant.findByIdAndDelete(req.params._id );
      if (!result) {
        return res.status(404).json({ success: false, message: "Restaurant not found" });
      }
      res.json({ success: true, message: "Restaurant deleted successfully!" });
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      res.status(500).json({ success: false, message: "Error deleting restaurant" });
    }
  });

  app.get("/api/users", async (req, res) => {
    
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
      }
  });

  
  app.post("/api/users", async (req, res) => {
    try {
        const { name, username, password, type } = req.body;

        if (!name || !username || !password || !type) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            type,
        });

        await newUser.save();
        res.json({ success: true, message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
  
app.get("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
    }
  });

  app.put("/users/:id", async (req, res) => {
    try {
      const { name, username, password, type } = req.body;
      let updateFields = { name, username, type };
  
      if (password) {
        if (password.length < 6) {
          return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.password = hashedPassword;
      } else {
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        updateFields.password = existingUser.password; 
      }
  
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.json({ success: true, message: "User updated successfully", updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
  
  /*app.delete("/api/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  });*/

  app.delete("/api/users/:id", async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
  
app.listen(5000, () => console.log("Server running on port 5000"));
