import {ElMessageBox} from "element-plus";

/**
 * 全局进度条使用
 * import nprogress from 'nprogress'
 * nprogress.start()
 * nprogress.done()
 */

export function messageBox(info, type = 'warning') {
  return new Promise(resolve => {
    ElMessageBox.confirm(
      info,
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type,
        center: true,
      }
    ).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}