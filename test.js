console.log("Starting tests");
setTimeout(() => {
  console.log("Waiting 3 seconds...");
}, 3000);
console.log("Tests complete");
console.log("Database URL: ", process.env.DATABASE_URL);