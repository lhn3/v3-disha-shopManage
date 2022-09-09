import myAxios from '../index'

//获取图片分类标签列表
export const getImageClassify = (data) => {
  return myAxios.get({
    url: `/admin/image_class/${data.page}`,
    data: {limit: data.limit || 10}
  })
}


//获取指定分类下的图片列表
export const getImageList = (data) => {
  return myAxios.get({
    url: `/admin/image_class/${data.id}/image/${data.page}`,
    data: {limit: data.limit || 10}
  })
}