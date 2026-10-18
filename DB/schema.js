import { pgTable, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  body: varchar("body", { length: 500 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  done: boolean("done").notNull().default(false),
  archived: boolean("archived").notNull().default(false),
});