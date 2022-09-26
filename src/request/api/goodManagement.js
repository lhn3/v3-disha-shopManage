import myAxios from '../index'

//修改商品详情
export const updateGoodsDetail = (data) => {
  return myAxios.post({
    url: `/admin/goods/${data.id}`,
    data : {content: data.content}
  })
}