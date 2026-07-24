// Roda automaticamente antes de todo build (via "prebuild" no package.json),
// tanto local quanto no GitHub Actions. Evita que uma foto de celular/câmera
// enviada sem edição pelo painel do Sveltia (câmeras modernas fazem fotos de
// 10-20MB) vá parar no site do jeito que foi enviada.
//
// Importante: preserva o NOME e a EXTENSÃO originais do arquivo (mesmo que a
// extensão esteja "errada", tipo uma foto JPEG salva como .png) — só troca o
// conteúdo por uma versão redimensionada e comprimida. Isso é proposital:
// o conteúdo das expedições (.md) referencia o caminho exato do arquivo:
// se o script trocasse a extensão sozinho, os links de imagem quebrariam.
//
// Isso só altera os arquivos DENTRO da pasta public/ usada pelo build da CI
// (um checkout novo a cada execução) — não mexe no que está commitado no
// repositório.

import sharp from "sharp";
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const TARGET_DIRS = ["public/images"];
const MAX_DIMENSION = 1600; // pixels, no lado maior da imagem
const SKIP_IF_UNDER_BYTES = 600 * 1024; // já é pequena, não mexe
const JPEG_QUALITY = 78;
const WEBP_QUALITY = 78;
const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp)$/i;

async function collectFiles(dir) {
    let entries;
    try {
        entries = await readdir(dir, { withFileTypes: true });
    } catch {
        return [];
    }
    const files = [];
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await collectFiles(full)));
        } else if (IMAGE_EXTENSIONS.test(entry.name)) {
            files.push(full);
        }
    }
    return files;
}

async function optimizeFile(filePath) {
    const originalStat = await stat(filePath);
    if (originalStat.size <= SKIP_IF_UNDER_BYTES) {
        return; // já é pequena o suficiente, não vale reprocessar
    }

    const originalBuffer = await readFile(filePath);
    const image = sharp(originalBuffer, { failOn: "none" }).rotate(); // rotate() aplica a orientação da EXIF
    const meta = await image.metadata();

    let pipeline = image;
    const longestSide = Math.max(meta.width ?? 0, meta.height ?? 0);
    if (longestSide > MAX_DIMENSION) {
        pipeline = pipeline.resize({
            width:
                meta.width && meta.width >= meta.height
                    ? MAX_DIMENSION
                    : undefined,
            height:
                meta.height && meta.height > meta.width
                    ? MAX_DIMENSION
                    : undefined,
            withoutEnlargement: true,
        });
    }

    // Detecta o formato real do CONTEÚDO (não a extensão do arquivo) pra
    // decidir como recodificar. Fotos (jpeg) sempre viram jpeg comprimido;
    // pngs de verdade (ícones, capturas de tela com transparência) continuam
    // png, só comprimidos mais.
    let outputBuffer;
    if (meta.format === "png") {
        outputBuffer = await pipeline
            .png({ compressionLevel: 9, palette: true })
            .toBuffer();
    } else if (meta.format === "webp") {
        outputBuffer = await pipeline
            .webp({ quality: WEBP_QUALITY })
            .toBuffer();
    } else {
        // jpeg e qualquer outro formato de foto
        outputBuffer = await pipeline
            .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
            .toBuffer();
    }

    // Só sobrescreve se realmente ficou menor (evita piorar um arquivo já otimizado)
    if (outputBuffer.length < originalBuffer.length) {
        await writeFile(filePath, outputBuffer);
        const before = (originalBuffer.length / 1024).toFixed(0);
        const after = (outputBuffer.length / 1024).toFixed(0);
        console.log(`optimize-images: ${filePath} ${before}KB -> ${after}KB`);
    }
}

async function main() {
    const allFiles = (await Promise.all(TARGET_DIRS.map(collectFiles))).flat();
    for (const file of allFiles) {
        try {
            await optimizeFile(file);
        } catch (err) {
            console.warn(
                `optimize-images: falha ao processar ${file}:`,
                err.message,
            );
        }
    }
    console.log(
        `optimize-images: ${allFiles.length} arquivo(s) verificado(s).`,
    );
}

await main();
