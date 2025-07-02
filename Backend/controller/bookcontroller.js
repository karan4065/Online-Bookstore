import Book from "../model/book_model.js";

export const getBook = async (req, res) => {
    try {
        const books = await Book.find(); 
        res.json(books); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};