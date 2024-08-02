import bookModel from "../models/bookModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllBooks = async(req,res) => {
    try {
        const books = await bookModel.find();
        res.status(StatusCodes.OK)
        .json({
            length:books.length,
            data:books
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            msg:"Error! While Displaying Books"
        });
    }
}

export const addBook = async(req,res) => {
    try {
        await bookModel.create(req.body);
        res.status(StatusCodes.OK)
        .json({
            msg:"Book Added Successfully"
        });
    }catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            msg:"Error! While Adding Book"
        });
    }
}

export const updateBook = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await bookModel.findByIdAndUpdate(id,req.body,{new:"true"});
        res.status(200)
        .json({
            msg:'Book Updated Successfully',book
        })
        
    } catch (error) {
        res.status(500)
        .json({
            msg:"Error! While Updating Book"
        })
    }
}

export const getBook = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await bookModel.findById(id);
        if(book){
            return res.status(StatusCodes.OK)
            .json({book})
        }
        else{
            return res.status(StatusCodes.NOT_FOUND)
            .json({msg:`No Book found with id: ${id}`});
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            msg:"Error! While Fetching Book"
        })
    }
}

export const deleteBook = async(req,res) => {
    try {
        console.log(req.params)
        const {id} = req.params;
        // const deletedBook = await bookModel.findByIdAndDelete(id);
        // findByIdAndDelete will return deleted record as json Object

        const deletedBook = await bookModel.deleteOne({_id:id})
        // deleteOne will return json Object with {acknowledge:true/false, deleteCount}
        if(deletedBook.deletedCount){
            return res.status(200)
            .json({
                msg: "Book Deleted Successfully", deletedBook
            })
        }
        res.status(404)
        .json({
            msg:`book with id: ${id} not found`
        });
    } catch (error) {
        res.status(500)
        .json({
            msg:"Error! While Deleting Book"
        });
    }
}