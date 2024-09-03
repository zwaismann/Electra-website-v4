import dotenv from 'dotenv'
import Mux from '@mux/mux-node'

dotenv.config()

const muxClient = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
)

const { Video } = muxClient

async function uploadVideo() {
  try {
    const upload = await Video.Uploads.create({
      new_asset_settings: { playback_policy: 'public' },
    })
    console.log(`Upload URL: ${upload.url}`)
  } catch (error) {
    console.error('Error creating upload:', error)
  }
}

uploadVideo()
