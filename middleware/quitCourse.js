const axiosInstance = require('../axiosInstance')
const { url_A, url_B, url_C } = require('../urlConfig')

let middleWare = async (req, res) => {
    axiosInstance.defaults.headers.get['Cookie'] = req.headers.cookie
    let { student, course } = req.body
    let result = { result: false }
    switch (course.college) {
        case '建筑学院':
            result = await quitInA(student, course, result)

            break
        case '软件学院':
            result = await quitInB(student, course, result)

            break
        case '历史学院':
            result = await quitInC(student, course, result)

            break
        case '公选课程':
            let resultA = await quitInA(student, course, result)
            let resultB = await quitInB(student, course, result)
            let resultC = await quitInC(student, course, result)
            result.result=resultA.result&&resultB.result&&resultC.result
            
            break
        default:
            break
    }
    return res.send(result)
}
module.exports = middleWare

async function quitInC(student, course, result) {
    try {
        let ans = await axiosInstance.post(url_C + '/quit', {
            username: student.number,
            courseId: course.number
        })
        result = ans.data
    } catch (error) {
        console.log('C退课出错')
    }
    return result
}

async function quitInB(student, course, result) {
    try {
        let ans = await axiosInstance.get(url_B + '/cancle', {
            params: {
                stu_id: student.number,
                course_id: course.number
            }
        })
        result = ans.data
    } catch (error) {
        console.log('B退课出错')
    }
    return result
}

async function quitInA(student, course, result) {
    try {
        let ans = await axiosInstance.get(url_A + '/api/cancelCourse', {
            params: {
                studentNumber: student.number,
                courseNumber: course.number
            }
        })
        result = ans.data
    } catch (error) {
        console.log('A退课出错')
    }
    return result
}
