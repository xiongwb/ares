import {
  SERVER_URL,
} from 'AresConstant'

const buildUrl = (path) => {
  return SERVER_URL + path
};

export default buildUrl
