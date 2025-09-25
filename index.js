const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Step 4: In-memory array to store books
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "Clean Code", author: "Robert C. Martin" },
];

// Step 5: GET /books → Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Step 6: POST /books → Add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Step 7: PUT /books/:id → Update a book
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const book = books.find(b => b.id == id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// Step 8: DELETE /books/:id → Delete a book
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = books.length;
  books = books.filter(b => b.id != id);

  if (books.length === initialLength) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({ message: "Book deleted successfully" });
});

// Default route
app.get("/", (req, res) => {
  res.send("Books API is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
