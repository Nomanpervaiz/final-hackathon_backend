import { TokenModel } from "./models/token";
const Router = express.Router();

// Create a new token
Router.post("/", async (req, res) => {
  try {
    const newToken = await TokenModel.create(req.body);
    res.status(201).json(newToken);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all tokens
Router.get("/", async (req, res) => {
  try {
    const tokens = await TokenModel.find();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific token by ID
Router.get("/:id", async (req, res) => {
  try {
    const token = await TokenModel.findById(req.params.id);
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a token by ID
Router.put("/:id", async (req, res) => {
  try {
    const updatedToken = await TokenModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedToken) {
      return res.status(404).json({ error: "Token not found" });
    }
    res.status(200).json(updatedToken);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a token by ID
Router.delete("/:id", async (req, res) => {
  try {
    const deletedToken = await TokenModel.findByIdAndDelete(req.params.id);
    if (!deletedToken) {
      return res.status(404).json({ error: "Token not found" });
    }
    res.status(200).json({ message: "Token deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default Router;