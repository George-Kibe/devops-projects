import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application Server is running on port http://localhost:${PORT}`);
});
