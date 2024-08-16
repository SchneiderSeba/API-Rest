import cors from 'cors'
import ACCEPTED_ORIGIN from '..//originAccepted.js'

export const corsMiddleware = () => cors({
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGIN.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})
