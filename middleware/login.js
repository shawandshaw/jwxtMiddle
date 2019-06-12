const axiosInstance  =require('../axiosInstance')
const {url_A,url_B,url_C} =require('../urlConfig')


let multiLogin = async function(req, res) {
    let user = req.body
    try {
        let ans = await axiosInstance.post(url_A + '/api/login', {
            number: user.number,
            password: user.password
        })
        if (ans.data.result == true) {
            res.setHeader('set-cookie', ans.headers['set-cookie'])
            return res.send({ result: true, college: '建筑学院' })
        }
    } catch (err) {
        console.log('请求A出错')
    }
    try {
        let ans = await axiosInstance.post(url_B + '/login', {
            id: user.number,
            password: user.password
        })
        if (ans.data.result == true) {
            return res.send({ result: true, college: '软件学院' })
        }
    } catch (err) {
        console.log('请求B出错')
    }
    try {
        let ans = await axiosInstance.post(url_C + '/login', {
            username: user.number,
            password: user.password
        })
        if (ans.data.result == true) {
            return res.send({ result: true, college: '历史学院' })
        }
    } catch (err) {
        console.log('请求C出错')
    }
    return res.send({ result: false })
}

module.exports=multiLogin;
