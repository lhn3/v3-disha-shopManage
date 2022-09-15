import myAxios from '../index'

//修改管理员状态
export const updateManagerStatus = (data) => {
  return myAxios.post({
    url: `/admin/manager/${data.id}/update_status`,
    data
  })
}