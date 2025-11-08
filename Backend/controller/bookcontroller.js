import Book from "../model/book_model.js"

export const createBook = async (req, res) => {
  try {
    const { name, price, category, image, title } = req.body;

    if (!name || !price || !category || !image || !title) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({ name, price, category, image, title });
    await newBook.save();

    return res.status(201).json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create book" });
  }
};

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const CountTotalBooks = async(req,res) => {
   try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
}

// ✅ UPDATE BOOK
export const updateBook = async (req, res) => {
  try {
    const { name, price, category, image, title } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { name, price, category, image, title },
      { new: true }
    );

    if (!updatedBook) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Error updating book", error: err });
  }
};

// ✅ DELETE BOOK
export const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book", error: err });
  }
};