import { Router } from "express";
import { dbQueries } from "../DB/queries.js";
import { safe } from "../Middleware/safe.js";
import { validateId } from "../Middleware/validateId.js";

const db = dbQueries();
export const toggleRoute = Router();

const toggle = (action, label) =>
  safe(async (req, res) => {
    const data = await db[action](req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ error: `This Todo does not exist to ${label} it` });
    }
    return res.status(200).json({ data });
  });

toggleRoute.patch("/:id/toggle", validateId, toggle("toggleDone", "toggle"));
toggleRoute.patch("/:id/archive", validateId, toggle("toggleArchive", "archive"));