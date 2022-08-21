import {ElMessageBox} from "element-plus";

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