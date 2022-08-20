import myAxios from '../index'

//请求登录
export const login = (data) => {
  return myAxios.post({
    url: '/admin/login',
    data
  })
}