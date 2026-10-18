import { eq, desc, ilike, or, sql } from "drizzle-orm";
import { db } from "./db.js";
import { todo } from "./schema.js";

const toId = (id) => Number(id);

export const dbQueries = () => ({
  getAll: () => db.select().from(todo).orderBy(desc(todo.createdAt)),

  search: (text) => {
    const safe = text.replace(/[%_\\]/g, "\\$&");
    return db
      .select()
      .from(todo)
      .where(or(ilike(todo.title, `%${safe}%`), ilike(todo.body, `%${safe}%`)))
      .orderBy(desc(todo.createdAt));
  },

  getbyid: async (id) => {
    const [row] = await db.select().from(todo).where(eq(todo.id, toId(id)));
    return row ?? null;
  },

  create: async (title, body) => {
    const [row] = await db.insert(todo).values({ title, body }).returning();
    return row;
  },

  update: async (id, title, body) => {
    const [row] = await db
      .update(todo)
      .set({ title, body })
      .where(eq(todo.id, toId(id)))
      .returning();
    return row ?? null;
  },

  remove: async (id) => {
    const [row] = await db.delete(todo).where(eq(todo.id, toId(id))).returning();
    return row ?? null;
  },

  toggleDone: async (id) => {
    const [row] = await db
      .update(todo)
      .set({ done: sql`NOT ${todo.done}` })
      .where(eq(todo.id, toId(id)))
      .returning();
    return row ?? null;
  },

  toggleArchive: async (id) => {
    const [row] = await db
      .update(todo)
      .set({ archived: sql`NOT ${todo.archived}` })
      .where(eq(todo.id, toId(id)))
      .returning();
    return row ?? null;
  },
});