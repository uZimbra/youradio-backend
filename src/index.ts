import express, { json } from "express";

const app = express();

app.use(json());

app.get("/", (_, response) => {
  return response.status(200).json({
    status: "OK",
  });
});

app.listen(3333, () =>
  console.log("Server is running on http://localhost:3333")
);
