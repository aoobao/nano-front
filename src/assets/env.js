let URL

if (process.env.NODE_ENV === 'development') {
  URL = 'http://localhost:7001/api/'
} else {
  URL = ''
}

export default {
  URL
}
