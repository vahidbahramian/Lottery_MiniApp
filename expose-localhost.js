/* eslint-disable no-undef */
import ngrok from '@ngrok/ngrok'
import * as dotenv from 'dotenv'

dotenv.config()
console.log(process.env.NGROK_AUTH_TOKEN)
console.log(process.env.NGROK_DOMAIN)

// 1. Robust Error Handling
async function startNgrok() {
  try {
    const options = {
      addr: 5173,
      authtoken: process.env.NGROK_AUTH_TOKEN,
      domain: process.env.NGROK_DOMAIN,
      onStatusChange: (status) => console.log(`Ngrok status: ${status}`), // Optional
    }

    await ngrok.connect(options)
    process.stdin.resume()
    console.info(`Exposed to: ${JSON.stringify(`https://${options.domain}`)}`)
  } catch (error) {
    console.error('Error connecting to ngrok:', error)
    process.exit(1) // Exit on error
  }
}

// 2. Call the Function
startNgrok()

// 3. Graceful Shutdown (Optional)
process.on('SIGINT', () => {
  ngrok.disconnect().then(() => {
    console.log('Ngrok tunnel closed.')
    process.exit(0)
  })
})
