import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const POSTS_DIR = "posts";
const PUBLIC_DIR = "public/posts";

const skipExts = new Set([".md", ".mdx", ".json"]);

if (!existsSync(POSTS_DIR)) process.exit(0);

const uids = readdirSync(POSTS_DIR).filter((name) =>
  statSync(join(POSTS_DIR, name)).isDirectory()
);

for (const uid of uids) {
  const srcDir = join(POSTS_DIR, uid);
  const destDir = join(PUBLIC_DIR, uid);
  const files = readdirSync(srcDir).filter(
    (f) => !skipExts.has(extname(f).toLowerCase()) && statSync(join(srcDir, f)).isFile()
  );

  if (files.length === 0) continue;
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

  for (const file of files) {
    cpSync(join(srcDir, file), join(destDir, file));
  }
}

console.log(`[sync-post-assets] Synced assets from ${uids.length} post(s)`);
