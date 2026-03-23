import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync, existsSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier-terser';
import { minify as minifyJs } from 'terser';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeText(path, content) {
  ensureDir(dirname(path));
  writeFileSync(path, content, 'utf8');
}

function readText(path) {
  return readFileSync(path, 'utf8');
}

async function build() {
  rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);

  const cssInputPath = join(ROOT, 'assets', 'css', 'main.css');
  const jsInputPath = join(ROOT, 'assets', 'js', 'main.js');

  const cssSource = readText(cssInputPath);
  const jsSource = readText(jsInputPath);

  const cssMinified = new CleanCSS({ level: 2 }).minify(cssSource);
  if (cssMinified.errors.length) {
    throw new Error(`CSS minify failed: ${cssMinified.errors.join('; ')}`);
  }

  const jsMinified = await minifyJs(jsSource, {
    compress: true,
    mangle: true,
    format: { comments: false }
  });

  if (!jsMinified.code) {
    throw new Error('JS minify failed: no output generated.');
  }

  writeText(join(DIST, 'assets', 'css', 'main.min.css'), cssMinified.styles);
  writeText(join(DIST, 'assets', 'js', 'main.min.js'), jsMinified.code);

  const htmlFiles = [
    { src: join(ROOT, 'index.html'), out: join(DIST, 'index.html') },
    { src: join(ROOT, 'pages', 'about.html'), out: join(DIST, 'pages', 'about.html') },
    { src: join(ROOT, 'pages', 'projects.html'), out: join(DIST, 'pages', 'projects.html') },
    { src: join(ROOT, 'pages', 'contact.html'), out: join(DIST, 'pages', 'contact.html') }
  ];

  for (const file of htmlFiles) {
    const htmlSource = readText(file.src)
      .replace(/assets\/css\/main\.css/g, 'assets/css/main.min.css')
      .replace(/assets\/js\/main\.js/g, 'assets/js/main.min.js')
      .replace(/\.\.\/assets\/css\/main\.css/g, '../assets/css/main.min.css')
      .replace(/\.\.\/assets\/js\/main\.js/g, '../assets/js/main.min.js');

    const htmlMinified = await minifyHtml(htmlSource, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: false,
      minifyJS: false
    });

    writeText(file.out, htmlMinified);
  }

  const imagesSrc = join(ROOT, 'assets', 'images');
  const imagesOut = join(DIST, 'assets', 'images');
  if (existsSync(imagesSrc)) {
    ensureDir(imagesOut);
    cpSync(imagesSrc, imagesOut, { recursive: true });
  }

  if (existsSync(join(ROOT, 'README.md'))) {
    copyFileSync(join(ROOT, 'README.md'), join(DIST, 'README.md'));
  }

  const rootStaticFiles = ['robots.txt', 'sitemap.xml', 'site.webmanifest'];
  for (const fileName of rootStaticFiles) {
    const src = join(ROOT, fileName);
    if (existsSync(src)) {
      copyFileSync(src, join(DIST, fileName));
    }
  }

  console.log('Build complete. Production files generated in dist/.');
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
