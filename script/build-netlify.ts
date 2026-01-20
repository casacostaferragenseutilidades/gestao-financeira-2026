import { build as viteBuild } from "vite";
import { rm } from "fs/promises";

async function buildForNetlify() {
  console.log("Cleaning dist directory...");
  await rm("dist", { recursive: true, force: true });

  console.log("Building client with Vite...");
  await viteBuild();
  
  console.log("Client build completed successfully!");
  console.log("Frontend ready for Netlify deployment.");
}

buildForNetlify().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
