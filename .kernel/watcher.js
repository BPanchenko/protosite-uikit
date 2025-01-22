import child_process from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

import debounce from 'lodash/debounce.js'
import Watcher from 'watcher'
import { logger } from './logger.cjs'

const build = debounce(() => child_process.exec('npm run build:css', (error, stdout, stderr) => logger.log(stdout)), 850, { maxWait: 1000 })
const deploy = debounce(() => child_process.exec('npm run deploy', (error, stdout, stderr) => logger.log(stdout)), 2000, { maxWait: 3000 })

const eventHandler = (event, targetPath, targetPathNext) => {
	logger.event(event, targetPath, targetPathNext ?? '')
}

const watcherAssets = new Watcher(
	['assets'].map((dir) => path.resolve(dir)),
	{
		recursive: true
	},
	eventHandler
)
	.on('ready', () => logger.info(`Watching Assets is running`))
	.on('change', () => deploy())

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
;['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig) => process.on(sig, () => (watcherAssets.close(), watcherSources.close())))
