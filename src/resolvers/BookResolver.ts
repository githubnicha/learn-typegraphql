import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Book } from "../models/Book";
import { CreateBookInput } from "../inputs/CreateBookInput";
import { UpdateBookInput } from "../inputs/UpdateBookInput";

@Resolver()
export class BookResolver {
    @Query(() => [Book])
    books() {
        return Book.find()
    }

    @Query(() => Book)
    async book(@Arg("id") id: string) {
        const book = await Book.findOne({ where: { id } });
        if (!book) throw new Error("Book nof found");
        return book;
    }

    @Mutation(() => Book)
    async createBook(@Arg("data") data: CreateBookInput) {
        const book = Book.create(data);
        await book.save();
        return book;

    }

    @Mutation(() => Book)
    async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
        const book = await Book.findOne({ where: { id } });
        if (!book) throw new Error("Book nof found");
        Object.assign(book, data);
        await book.save();
        return book;
    }

    @Mutation(() => Boolean)
    async deleteBook(@Arg("id") id: string) {
        const book = await Book.findOne({ where: { id } });
        if(!book) throw new Error("Book not found");
        await book.remove();
        return true;
    }
}