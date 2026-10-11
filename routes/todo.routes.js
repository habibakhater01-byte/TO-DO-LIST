import { Router } from "express";
import { dbQueries } from "../DB/queries.js";
import { checkSchema } from "../Middleware/checkSchema.js";
import { todoSchema } from "../Schema/todolistSchema.js";

const db = dbQueries();
export const todoRoute = Router();

todoRoute
  .route("/")
  .get(async (req, res) => {
    const { search } = req.query;
    if (search) {
      const todo_search = await db.search(search);
      return res.status(200).json({ data: todo_search });
    }
    const data = await db.getAll();
    return res.status(200).json({ data: data });
  })
  .post(checkSchema(todoSchema), async (req, res) => {
    const { title, body } = req.body;
    const data = await db.create(title, body);
    return res.status(201).json({
      message: "TODO created Successfully",
      data: data,
    });
  });

todoRoute
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const existing = await db.getbyid(id);
    if (!existing) {
      return res.status(404).json({ error: "This Todo does not exist" });
    }
    return res.status(200).json({ data: existing });
  })
  .patch(checkSchema(todoSchema.partial()), async (req, res) => {
    const { id } = req.params;
    const existing = await db.getbyid(id);
    if (!existing) {
      return res.status(404).json({ error: "This Todo does not exist to update it" });
    }
    const { title, body } = req.body;
    const data = await db.update(id, title ?? existing.title, body ?? existing.body);
    return res.status(200).json({
      message: "Todo is Updated Successfully",
      data: data,
    });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const existing = await db.getbyid(id);
    if (!existing) {
      return res.status(404).json({ error: "Can't find the Todo to delete it" });
    }
    await db.Delete(id);
    return res.status(200).json({ message: "Todo deleted successfully" });
  });