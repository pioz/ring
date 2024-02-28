import 'dotenv/config'
import { RingApi } from 'ring-client-api'
import { Command } from 'commander'

const record = async (outputFilePath, seconds) => {
  // Obtain your refreshToken with `npm run auth`
  const ringApi = new RingApi({ refreshToken: process.env.RING_REFRESH_TOKEN })
  const cameras = await ringApi.getCameras()
  const camera = cameras[0]

  if (!camera) {
    console.log('No cameras found')
    return
  }

  console.log(`Start recording from ${camera.name}`)
  await camera.recordToFile(outputFilePath, seconds)
}

// Start here

const options = new Command()
  .name('ring')
  .description('Record video to file from a Ring cam')
  .version('0.1.0')
  .option('-o, --output <char>', 'recorded output file')
  .option('-s, --seconds <int>', 'length of the video in seconds')
  .parse()
  .opts()

await record(options.output, options.seconds).catch((e) => {
  console.error(e)
  process.exit(1)
})
process.exit(0)
