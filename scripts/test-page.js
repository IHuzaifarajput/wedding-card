const http = require("http");

http.get("http://localhost:3000", (res) => {
  console.log("Status code:", res.statusCode);
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    console.log("HTML response size:", data.length);
    console.log("Includes HUZIAFA:", data.includes("HUZIAFA"));
    console.log("Includes KASHAF:", data.includes("KASHAF"));
    console.log("Includes Valima Celebration:", data.includes("Valima Celebration"));
    console.log("Includes wa.me link:", data.includes("wa.me"));
    console.log("Includes Google Maps link:", data.includes("maps/search"));
    console.log("Includes Kudmayi music:", data.includes("kudmayi.mp3"));
  });
}).on("error", (err) => {
  console.error("HTTP request error:", err.message);
});

