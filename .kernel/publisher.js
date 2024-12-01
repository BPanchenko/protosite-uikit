import { Client } from 'basic-ftp'
import path from 'node:path'

const files = new Map([['assets/component/select-field.css', 'core/select-field.css']])

;(async function publish() {
	const client = new Client()
	client.ftp.verbose = true

	try {
		await client.access({
			host: 'ftp.bp.nichost.ru',
			user: 'bp_assets',
			password: '3CXoRRok',
			secure: false
		})
		files.forEach(async (to, from) => await client.uploadFrom(path.join(process.cwd(), from), to))
	} catch (err) {
		console.log(err)
	}

	client.close()
})()
