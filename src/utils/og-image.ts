import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const root = process.cwd();

const portraitData = readFileSync(resolve(root, 'src/assets/portrait.jpg'));
const portraitSrc = `data:image/jpeg;base64,${portraitData.toString('base64')}`;

const fontRegular = readFileSync(resolve(root, 'src/assets/fonts/atkinson-regular.woff'));
const fontBold = readFileSync(resolve(root, 'src/assets/fonts/atkinson-bold.woff'));

export async function renderOgImage(title: string, description: string): Promise<ArrayBuffer> {
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					display: 'flex',
					width: '1200px',
					height: '630px',
					backgroundColor: '#ffffff',
					fontFamily: 'Atkinson',
				},
				children: [
					// Text panel (dark background, left side)
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								backgroundColor: '#FFF',
								padding: '60px',
								width: '760px',
								height: '630px',
							},
							children: [
								// Title + description
								{
									type: 'div',
									props: {
										style: { display: 'flex', flexDirection: 'column', gap: '24px' },
										children: [
											{
												type: 'div',
												props: {
													style: {
														fontSize: '62px',
														fontWeight: 700,
														color: '#0d1017',
														lineHeight: 1.15,
													},
													children: title,
												},
											},
											{
												type: 'div',
												props: {
													style: {
														fontSize: '28px',
														color: 'rgb(130, 145, 175)',
														lineHeight: 1.5,
													},
													children: description,
												},
											},
										],
									},
								},
								// Site URL at bottom
								{
									type: 'div',
									props: {
										style: {
											fontSize: '24px',
											color: 'rgb(30, 35, 52)',
											fontWeight: 700,
										},
										children: 'jesseblack.net',
									},
								},
							],
						},
					},
					// Portrait (white background, right side, full height)
					{
						type: 'img',
						props: {
							src: portraitSrc,
							width: 440,
							height: 630,
							style: {
								objectFit: 'cover',
								objectPosition: 'center top',
							},
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Atkinson', data: fontRegular.buffer as ArrayBuffer, weight: 400 },
				{ name: 'Atkinson', data: fontBold.buffer as ArrayBuffer, weight: 700 },
			],
		},
	);

	const buf = await sharp(Buffer.from(svg)).png().toBuffer();
	return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}
