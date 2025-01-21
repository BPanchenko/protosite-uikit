import { Client } from 'basic-ftp'
import { globSync } from 'glob'
import path from 'node:path'
import { logger } from './logger.cjs'

import ftpAccess from '../.config/ftp.json' with { type: 'json' }

const coreStylesheets = [
	['assets/component/select.css', 'core/component.select.css'],
	['assets/component/arrow.css', 'core/element.arrow.css']
]

const uikitModules = globSync(['assets/*.{css,mjs}', 'assets/component/*.{css,mjs}', 'assets/style/*.{css,mjs}'], {
	ignore: ['assets/component/arrow.{css,mjs}', 'assets/component/select.{css,mjs}']
}).map((file) => [file, path.join('uikit', path.relative('assets', file)).replaceAll('\\', '/')])

const files = new Map([...coreStylesheets, ...uikitModules].sort(([_a, a], [_b, b]) => (a < b ? -1 : a > b ? 1 : 0)))

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
