import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../../consts';
import { renderOgImage } from '../../utils/og-image';

export const GET: APIRoute = async () => {
	const png = await renderOgImage(SITE_TITLE, SITE_DESCRIPTION);
	return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
