// removes the previous build from the repository root (index.html + assets/ are generated from app/)
import { rmSync } from "node:fs"
import { resolve } from "node:path"
for (const f of ["index.html", "assets", "favicon.svg", "favicon-32.png", "apple-touch-icon.png", "icon-512.png"]) {
  rmSync(resolve("..", f), { recursive: true, force: true })
}
