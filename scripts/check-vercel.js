const https = require("https");

https
  .get("https://wedding-card-alpha-two.vercel.app", (res) => {
    console.log("Status Code:", res.statusCode);
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      console.log("Data length:", data.length);
      console.log("Includes HUZIAFA:", data.includes("HUZIAFA"));
      console.log("Includes 404:", data.includes("404"));
      if (data.length < 500) {
        console.log("Response text:", data);
      }
    });
  })
  .on("error", (err) => {
    console.error("HTTP error:", err.message);
  });

