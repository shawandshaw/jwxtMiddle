const axiosInstance  =require('../axiosInstance')
const {url_A,url_B,url_C} =require('../urlConfig')


let middleWare = async function(req, res) {
    let number = req.query.number
    try {
        let ans = await axiosInstance.get(url_A + '/students', {
            params:{number:number}
        })
            return res.send({ name:ans.data[0].name})
    } catch (err) {
        console.log('请求A出错')
    }
    try {
        let {data:{name}} = await axiosInstance.get(url_B + '/getName', {
            params:{stu_id:number}
        })
            return res.send({ name})
    } catch (err) {
        console.log('请求B出错')
    }
    try {
        let {data:{name}} = await axiosInstance.post(url_C + '/getName', {
            username: number,
        })
        return res.send({ name})
    } catch (err) {
        console.log('请求C出错')
    }
    return res.send()
}

module.exports=middleWare;
