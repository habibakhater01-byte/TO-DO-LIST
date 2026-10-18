import { Router } from "express";
import { dbQueries } from "../DB/queries.js";
import { checkSchema } from "../Middleware/checkSchema.js";
import { todoSchema } from "../Schema/todolistSchema.js";
import { safe } from "../Middleware/safe.js";
import { validateId } from "../Middleware/validateId.js";

const db = dbQueries();
export const todoRoute = Router();

todoRoute
  .route("/")
  .get(
    safe(async (req, res) => {
      const { search } = req.query;
      const data = search ? await db.search(search) : await db.getAll();
      return res.status(200).json({ data });
    })
  )
  .post(
    checkSchema(todoSchema),
    safe(async (req, res) => {
      const { title, body } = req.body;
      const data = await db.create(title, body);
      return res
        .status(201)
        .json({ message: "TODO created successfully", data });
    })
  );

todoRoute
  .route("/:id")
  .all(validateId)
  .get(
    safe(async (req, res) => {
      const existing = await db.getbyid(req.params.id);
      if (!existing) {
        return res.status(404).json({ error: "This Todo does not exist" });
      }
      return res.status(200).json({ data: existing });
    })
  )
  .patch(
    checkSchema(todoSchema.partial()),
    safe(async (req, res) => {
      const { id } = req.params;
      const existing = await db.getbyid(id);
      if (!existing) {
        return res
          .status(404)
          .json({ error: "This Todo does not exist to update it" });
      }
      const { title, body } = req.body;
      const data = await db.update(
        id,
        title ?? existing.title,
        body ?? existing.body
      );
      return res
        .status(200)
        .json({ message: "Todo updated successfully", data });
    })
  )
  .delete(
    safe(async (req, res) => {
      const removed = await db.remove(req.params.id);
      if (!removed) {
        return res
          .status(404)
          .json({ error: "Can't find the Todo to delete it" });
      }
      return res.status(200).json({ message: "Todo deleted successfully" });
    })
  );