import { Client } from 'basic-ftp'
import { globSync } from 'glob'
import path from 'node:path'
import { logger } from './logger.cjs'

import ftpAccess from '../.config/ftp.json' with { type: 'json' }

const baseUrl = new URL('http://assets.protosite.rocks/')

const ROOT = process.cwd()
const DIST = path.resolve(ROOT, 'assets')
const SHADY = path.resolve(DIST, 'shadow-dom')

const coreFiles = globSync('assets/shadow-dom/*.css', {
	root: SHADY,
	absolute: true
}).map((absFilePath) => {
	const remotePath = path.join('core', path.relative(SHADY, absFilePath)).split(path.sep).join('/')
	return [absFilePath, remotePath]
})

const uikitFiles = globSync(['assets/*.{css,mjs}', 'assets/{component,element,style}/*.{css,mjs}'], {
	root: DIST,
	absolute: true
}).map((absFilePath) => {
	const remotePath = path.join('uikit', path.relative(DIST, absFilePath)).split(path.sep).join('/')
	return [absFilePath, remotePath]
})

const files = new Map([...coreFiles, ...uikitFiles].sort(([_a, a], [_b, b]) => (a < b ? -1 : a > b ? 1 : 0)))

;(async function deploy() {
	const client = new Client()

	try {
		await client.access(ftpAccess)
		logger.uploadCaption()

		for (const [from, to] of files) {
			await client.uploadFrom(from, to)
			logger.uploadedFile(new URL(to, baseUrl).toString())
		}
	} catch (err) {
		logger.error(err)
	}

	client.close()
})()
