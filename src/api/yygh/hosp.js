import request from '@/utils/request'


const api_name ='/admin/hosp/hospital'
export default {
    //医院列表
    getPageList(current,limit,searchObj){
        return request({
            url: `/admin/hosp/hospital/${current}/${limit}`,
            method: 'post',
            params: searchObj
        })
    },
    getPageList(current,limit,searchObj) {
        return request ({
          url: `/admin/hosp/hospital/${current}/${limit}`,
          method: 'get',
          params: searchObj  
        })
      },
    //查询dictCode查询下级数据字典
    findByDictCode(id){
        return request({
            url: `/admin/cmn/dict/findByDictCode/${id}`,
            method: 'get',
        })
    },
    //根据ID查询下级数据字典
    findByParentId(dictCode){
        return request({
            url: `/admin/cmn/dict/findChildData/${dictCode}`,
            method: 'get',
        })
    },
    //更新医院状态
    updateHospStatus(id,status){
        return request({
            url: `${api_name}/updateStatus/${id}/${status}`,
            method: 'post'
          })
    },
    //查看医院详情
    showHosp(id){
        return request({
            url: `${api_name}/show/${id}`,
            method: 'get'
          })
    }
    //医院列表
//   getPageList(current,limit,searchObj) {
//     return request ({
//       url: `/admin/hosp/hospital/${current}/${limit}`,
//       method: 'get',
//       params: searchObj  
//     })
//   },
//   //查询dictCode查询下级数据字典
//   findByDictCode(dictCode) {
//     return request({
//         url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
//         method: 'get'
//       })
//     },
  
//   //根据id查询下级数据字典
//   findByParentId(dictCode) {
//     return request({
//         url: `/admin/cmn/dict/findChildData/${dictCode}`,
//         method: 'get'
//       })
//   },
//   //更新医院状态
//   updateHospStatus(id,status) {
//     return request({
//         url: `/admin/hosp/hospital/updateStatus/${id}/${status}`,
//         method: 'put'
//       })
//   },
}