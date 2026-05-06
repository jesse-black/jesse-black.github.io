import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

/**
 * @param {unknown} value
 */
function getClassNames(value) {
	if (Array.isArray(value)) return value.filter((item) => typeof item === 'string');
	if (typeof value === 'string') return value.split(/\s+/).filter(Boolean);
	return [];
}

/**
 * @param {import('hast').Element} preNode
 */
function getCodeBlockLanguage(preNode) {
	const dataLanguage = preNode.properties?.dataLanguage ?? preNode.properties?.['data-language'];
	if (typeof dataLanguage === 'string' && dataLanguage.length > 0) return dataLanguage;

	const codeChild = preNode.children.find(
		(child) => child.type === 'element' && child.tagName === 'code',
	);

	const classNames = [
		...getClassNames(preNode.properties?.className),
		...(codeChild && codeChild.type === 'element' ? getClassNames(codeChild.properties?.className) : []),
	];
	const languageClass = classNames.find((name) => name.startsWith('language-') || name.startsWith('lang-'));

	if (!languageClass) return 'code';

	return languageClass.replace(/^language-/, '').replace(/^lang-/, '') || 'code';
}

export default function rehypeCodeBlockHeader() {
	/**
	 * @param {import('hast').Root} tree
	 */
	return function transformer(tree) {
		visit(tree, 'element', (node, index, parent) => {
			if (
				!parent ||
				typeof index !== 'number' ||
				node.tagName !== 'pre' ||
				node.children[0]?.type !== 'element' ||
				node.children[0].tagName !== 'code'
			) {
				return;
			}

			const language = getCodeBlockLanguage(node);

			parent.children[index] = h('div.code-block', [
				h('div.code-block-header', [
					h('span.code-block-language', language),
					h(
						'button.copy-code-button',
						{
							type: 'button',
							title: 'Copy',
							'aria-label': `Copy ${language} code`,
							'data-copy-source': 'code',
							'data-default-label': 'Copy',
							'data-copied-label': 'Copied!',
						},
						[h('span.copy-code-button__label', { 'data-copy-label': '' }, 'Copy')],
					),
				]),
				node,
			]);
		});
	};
}
