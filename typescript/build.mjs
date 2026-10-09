import { copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

// The name of the folder this resource ends up in on your server. vMenu identifies a plugin by its
// resource name, so renaming this renames the plugin's permissions and settings with it.
const resourceName = 'vMenu.ExamplePlugin.TypeScript';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'build', resourceName);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// FiveM loads plain scripts, not modules, so each side becomes one self-contained file.
const shared = { bundle: true, format: 'iife', target: 'es2020', logLevel: 'warning' };

await build({ ...shared, entryPoints: [join(root, 'src/client.ts')], platform: 'browser', outfile: join(out, 'client.js') });
await build({ ...shared, entryPoints: [join(root, 'src/server.ts')], platform: 'node', outfile: join(out, 'server.js') });

copyFileSync(join(root, 'fxmanifest.lua'), join(out, 'fxmanifest.lua'));
copyFileSync(join(root, 'README.md'), join(out, 'README.md'));

console.log(`Resource ready: ${out}`);
