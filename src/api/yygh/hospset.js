import request from '@/utils/request'

const api_name ='/admin/hosp'
export default {
    getPageList(current,limit,serarchObj){
        return request({
            url: `${api_name}/findPageCondition/${current}/${limit}`,
            method: 'post',
            data: serarchObj
        })
    },
    deleteById(id){
        return request({
            url: `${api_name}/delete/${id}`,
            method: 'delete'
        })   
    },
    saveHosp(hospitalSet){
        return request({
            url: `${api_name}/saveHospSet`,
            method: 'post',
            data :hospitalSet
        })   
    },
    //根据ID
    getHospSetf(id){
        return request({
            url: `${api_name}/getHospSet/${id}`,
            method: 'post'
        })
    },
    updateHospSet(hospitalSet){
        return request({
            url: `${api_name}/updateHospSet`,
            method: 'post',
            data: hospitalSet
        })
    },
    //批量删除医院
    delbatchHospSet(list){
        return request({
            url: `${api_name}/delBatch`,
            method: 'delete',
            data: list
        })
    },
    //设置状态锁定
    lockHospSet(){
        return request({
            url: `${api_name}/lockHospitalSet/${id}/${status}`,
            method: 'post',
        })
    }
}