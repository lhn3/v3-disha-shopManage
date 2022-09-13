import myAxios from '../index'

//获取管理员管理列表
export const getManagerList = (data) => {
  return myAxios.get({
    url: `/admin/manager/${data.page}`,
    data: {...data,limit: data.limit || 10}
  })
}

//修改管理员状态
export const updateManagerStatus = (data) => {
  return myAxios.post({
    url: `/admin/manager/${data.id}/update_status`,
    data
  })
}

//新增管理员
export const addManager = (data) => {
  return myAxios.post({
    url: `/admin/manager`,
    data
  })
}

//修改管理员
export const updateManager = (data) => {
  return myAxios.post({
    url: `/admin/manager/${data.id}`,
    data
  })
}

//删除管理员
export const delManager = (id) => {
  return myAxios.post({
    url: `/admin/manager/${id}/delete`
  })
}


