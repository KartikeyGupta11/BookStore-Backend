import express from 'express';
import {getAllBooks, addBook, getBook, updateBook, deleteBook,} from '../controllers/bookController.js';

const bookRoutes = express.Router();

// bookRoutes.get("/",getAllBooks);
// bookRoutes.post("/",addBook);
bookRoutes.route("/")
.get(getAllBooks)
.post(addBook);

// bookRoutes.get("/:id",getBook);
// bookRoutes.put("/:id",updateBook);
// bookRoutes.delete("/:id",deleteBook);
bookRoutes.route("/:id")
.get(getBook)
.put(updateBook)
.delete(deleteBook)

export default bookRoutes;