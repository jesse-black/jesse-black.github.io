import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const GET: APIRoute = async () => {
	const portraitData = readFileSync(resolve(process.cwd(), 'src/assets/portrait.jpg'));

	const size = 128;
	const mask = Buffer.from(
		`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="black" /></svg>`
	);

	const png = await sharp(portraitData)
		.resize(size, size, { fit: 'cover', position: 'top' }) // 'top' to match byline/header if they are headshots
		.composite([{ input: mask, blend: 'dest-in' }])
		.png()
		.toBuffer();

	return new Response(png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength) as ArrayBuffer, {
		headers: { 'Content-Type': 'image/png' },
	});
};
