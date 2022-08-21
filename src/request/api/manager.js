import myAxios from '../index'

//请求登录
export const login = (data) => {
  return myAxios.post({
    url: '/admin/login',
    data
  })
}

//获取用户信息
export const getUserInfo = () => {
  return myAxios.post({
    url: '/admin/getinfo'
  })
}

//退出登录
export const loginOut = () => {
  return myAxios.post({
    url: '/admin/logout'
  })
}