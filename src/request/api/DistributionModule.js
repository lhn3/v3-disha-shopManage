import myAxios from '../index'

//获取分销信息
export const getDistribution = () => {
  return myAxios.get({
    url: `/admin/agent/statistics`
  })
}