import { Client } from 'basic-ftp'
import { existsSync } from 'node:fs'
import { globSync } from 'glob'
import path from 'node:path'
import { logger } from './logger.cjs'

import ftpAccess from '../.config/ftp.json' with { type: 'json' }

const extensions = ['css', 'mjs']
const components = [
	['assets/component/arrow', 'uikit/component/arrow'],
	['assets/component/avatar', 'uikit/component/avatar'],
	['assets/component/backdrop', 'uikit/component/backdrop'],
	['assets/component/badge', 'uikit/component/badge'],
	['assets/component/button', 'uikit/component/button'],
	['assets/component/chart', 'uikit/component/chart'],
	['assets/component/control', 'uikit/component/control'],
	['assets/component/field', 'uikit/component/field'],
	['assets/component/grid', 'uikit/component/grid'],
	['assets/component/list', 'uikit/component/list'],
	['assets/component/modal', 'uikit/component/modal'],
	['assets/component/pagination', 'uikit/component/pagination'],
	['assets/component/panel', 'uikit/component/panel'],
	['assets/component/popover', 'uikit/component/popover'],
	['assets/component/progress', 'uikit/component/progress'],
	['assets/component/select-field', 'core/select-field'],
	['assets/component/tabs', 'uikit/component/tabs'],
	['assets/component/thumbnail', 'uikit/component/thumbnail']
]
	.map(([from, to]) =>
		extensions
			.map((ext) => {
				const source = path.resolve(`${from}.${ext}`)
				const toRemotePath = `${to}.${ext}`
				return [source, toRemotePath]
			})
			.filter(([source]) => existsSync(source))
	)
	.reduce((agr, modules) => agr.concat(modules))

const asIs = globSync(['assets/*.{css,mjs}', 'assets/style/*.{css,mjs}']).map((file) => [
	path.resolve(file),
	path.join('uikit', path.relative('assets', file)).replaceAll('\\', '/')
])

const files = new Map(components.concat(asIs).sort(([_a, a], [_b, b]) => (a < b ? -1 : a > b ? 1 : 0)))

;(async function deploy() {
	const client = new Client()

	try {
		await client.access(ftpAccess)
		logger.uploadCaption()

		for (const [from, to] of files.entries()) {
			await client.uploadFrom(from, to)
			logger.uploadedFile(to)
		}
	} catch (err) {
		logger.error(err)
	}

	client.close()
})()
