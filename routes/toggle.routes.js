import { Router } from "express";
import { dbQueries } from "../DB/queries.js";

const db = dbQueries();
export const toggleRoute = Router();

toggleRoute.patch("/:id/toggle", async (req, res) => {
  const { id } = req.params;
  const existing = await db.getbyid(id);
  if (!existing) {
    return res.status(404).json({ error: "This Todo does not exist to toggle it" });
  }
  const data = await db.toggleDone(id);
  return res.status(200).json({ data: data });
});
toggleRoute.patch("/:id/archive", async (req, res) => {
  const { id } = req.params;
  const existing = await db.getbyid(id);
  if (!existing) {
    return res.status(404).json({ error: "This Todo does not exist to archive it" });
  }
  const data = await db.toggleArchive(id);
  return res.status(200).json({ data: data });
});