let HOST = ''

// let PORT = '7000'
let PORT = ''

if (__DEV__) {
  HOST = 'http://127.0.0.1'
  PORT = '3725'
}

export const SERVER_API = HOST + (PORT ? ':' + PORT : '') + '/api'
