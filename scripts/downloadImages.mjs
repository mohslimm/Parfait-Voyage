import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicImgDir = path.join(__dirname, '../public/img')

const PHOTO_MAP = {
  'istanbul,turkey,travel':       'photo-1520250497591-112f2f40a3f4',
  'dubai,skyline,luxury':         'photo-1512453979798-5ea266f8880c',
  'paris,eiffel,travel':          'photo-1502602898657-3e91760cbb34',
  'maldives,ocean,luxury':        'photo-1514282401047-d79a71a590e8',
  'rome,colosseum,italy':         'photo-1552832230-c0197dd311b5',
  'barcelona,spain,travel':       'photo-1539037116277-4db20889f2d4',
  'london,big-ben,england':       'photo-1513635269975-59663e0ac1ad',
  'new-york,manhattan,city':      'photo-1485871981521-5b1fd3805eee',
  'tokyo,japan,city':             'photo-1540959733332-eab4deabeeaf',
  'santorini,greece,island':      'photo-1570077188670-e3a8d69ac5ff',
  'bali,indonesia,temple':        'photo-1537996194471-e657df975ab4',
  'marrakech,morocco,souk':       'photo-1539020140153-e479b8c27aa6',
  'cairo,egypt,pyramid':          'photo-1553913861-c0fddf2619ee',
  'madrid,spain,travel':          'photo-1543785734-4b6e564642f8',
  'amsterdam,netherlands,canal':  'photo-1534351590666-13e3e96b5902',
  'hero,travel,aerial':           'photo-1469854523086-cc02fe5d8800',
  'travel,luxury,vacation':       'photo-1476514525535-07fb3b4ae5f1',
  'kuala-lumpur,city,malaysia':   'photo-1596422846543-74c6fc0e2815', // added malaysia
  'zanzibar,beach,travel':        'photo-1586861635167-e5223aadc9fe', // added zanzibar
}

const BASE_URL = 'https://images.unsplash.com'

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`))
      }
      const file = fs.createWriteStream(filepath)
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err))
      })
    }).on('error', (err) => reject(err))
  })
}

async function run() {
  if (!fs.existsSync(publicImgDir)) {
    fs.mkdirSync(publicImgDir, { recursive: true })
  }
  
  for (const [key, id] of Object.entries(PHOTO_MAP)) {
    const filename = `${key.replace(/,/g, '-')}.jpg`
    const filepath = path.join(publicImgDir, filename)
    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${filename}, already exists.`)
      continue
    }
    const url = `${BASE_URL}/${id}?auto=format&fit=crop&w=800&h=600&q=80`
    console.log(`Downloading ${filename}...`)
    try {
      await downloadImage(url, filepath)
      console.log(`Successfully downloaded ${filename}`)
    } catch (e) {
      console.error(`Error downloading ${filename}:`, e.message)
    }
  }
}

run()
