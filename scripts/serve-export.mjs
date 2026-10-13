import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
const root = path.resolve("out");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
};
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://127.0.0.1").pathname,
    );
    let target = path.resolve(root, `.${pathname}`);
    if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403);
      response.end();
      return;
    }
    if ((await stat(target)).isDirectory())
      target = path.join(target, "index.html");
    const content = await readFile(target);
    response.writeHead(200, {
      "Content-Type": types[path.extname(target)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});
server.listen(Number(process.env.PORT || 4173), "127.0.0.1", () =>
  console.log(
    `Portfolio production preview: http://127.0.0.1:${server.address().port}`,
  ),
);
