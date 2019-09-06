import axios from 'axios'
import {
  Toast
} from 'mint-ui';
import tools from '@/utils/tools'

function execute(config) {
  return new Promise((resolve, reject) => {
    axios(config).then(response => {
      if (response.status == 200) {
        resolve(response.data)
      } else {
        Toast('this is a response error')
        reject(response.data)
      }
    }).catch(error => {
      Toast('this is a http error');
      reject(error)
    })
  })
}

function getJson(url, params) {
  return execute({
    url: url,
    params: params,
    method: 'GET'
  })
}

function postJson(url, params, data) {
  return execute({
    url: url,
    params: params,
    data: data,
    method: 'POST'
  })
}


export default {
  getJson: getJson,
  postJson: postJson
}
