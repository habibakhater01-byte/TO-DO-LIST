CREATE TABLE "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"body" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"archived" boolean DEFAULT false NOT NULL
);
