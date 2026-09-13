import { buildApp } from './app.js'
import { config } from './config/index.js'

async function main() {
  const app = await buildApp()

  try {
    app.listen(config.port, config.host, () => {
      console.log(`Server running at http://${config.host}:${config.port}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()