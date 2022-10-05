import myAxios from '../index'

//导出订单
export const exportOrder = (data) => {
  return myAxios.post({
    url: `/admin/order/excelexport?tab=${data.tab}`,
    data,
    responseType: 'blob'
  })
}