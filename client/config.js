const HOST = 'http://127.0.0.1'

let PORT = '7000'

if (__DEV__) {
  PORT = '3725'
}

export const SERVER_API = HOST + ':' + PORT + '/api'
