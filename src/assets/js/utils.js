import {
  Toast,
  MessageBox
} from 'mint-ui';

export function errMessage(msg) {
  Toast({
    message: msg,
    position: 'middle',
    duration: 3000,
  })
}

export function confirm(msg, title) {
  return new Promise(resolve => {
    MessageBox.confirm(msg, title).then(action => {
      // console.log(action)
      resolve(action)
    }, () => {
      // console.log(err, 'reject') // 取消
    })
  })
}


export default {
  errMessage,
  confirm
}
