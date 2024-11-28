import child_process from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

import debounce from 'lodash/debounce.js'
import Watcher from 'watcher'
import { logger } from './logger.cjs'

const build = debounce(
	() => {
		child_process.exec('npm run build:css', (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`)
				return
			}
			console.log(`stdout: ${stdout}`)
			console.error(`stderr: ${stderr}`)
		})
	},
	850,
	{
		maxWait: 1000
	}
)
const options = {
	recursive: true,
	renameDetection: true
}
const root = process.cwd()

const watcher = new Watcher(
	['component', 'document', 'object', 'settings', 'style', 'theme', 'utility'].map((dir) => path.join(root, dir)),
	options,
	(event, targetPath, targetPathNext) => {
		logger.event(event, targetPath, targetPathNext ?? '')
	}
)

watcher.on('all', () => build())
watcher.on('ready', () => logger.info(`Watching the source code is running`))
;['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig) => process.on(sig, () => watcher.close()))
