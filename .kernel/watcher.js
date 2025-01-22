import child_process from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

import debounce from 'lodash/debounce.js'
import Watcher from 'watcher'
import { logger } from './logger.cjs'

const build = debounce(() => child_process.exec('npm run build', (error, stdout, stderr) => logger.log(stdout)), 240, { maxWait: 300 })

const eventHandler = (event, targetPath, targetPathNext) => {
	logger.event(event, targetPath, targetPathNext ?? '')
}

const watcherSources = new Watcher(
	['component', 'document', 'object', 'settings', 'shadow-host', 'style', 'theme', 'utility'].map((dir) => path.resolve(dir)),
	{
		recursive: true,
		renameDetection: true
	},
	eventHandler
)
	.on('ready', () => logger.info(`Watching Source Code is running`))
	.on('change', () => build())
;['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig) => process.on(sig, () => watcherSources.close()))
