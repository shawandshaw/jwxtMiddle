const {axiosInstance,formDataAxios}  =require('../axiosInstance')
const { url_A, url_B, url_C } = require('../urlConfig')

let middleWare = async (req, res) => {
    //处理内院选课和跨院系选课
    axiosInstance.defaults.headers.get['Cookie'] = req.headers.cookie
    let { student, course } = req.body
    if (student.college != course.college) {
        //跨院系选课需要添加学生到本院
        switch (course.college) {
            case '建筑学院':
                await addStuToA(student)
                break
            case '软件学院':
                await addStuToB(student)
                break
            case '历史学院':
                await addStuToC(student)
                break
            case '公选课程':
                await addStuToA(student)
                await addStuToB(student)
                await addStuToC(student)
                break
            default:
                break
        }
    }
    let result = { result: false }
    switch (course.college) {
        case '建筑学院':
            result = await selectInA(student, course, result)

            break
        case '软件学院':
            result = await selectInB(student, course, result)

            break
        case '历史学院':
            result = await selectInC(student, course, result)
        case '公选课程':
            let resultA = await selectInA(student, course, result)
            let resultB = await selectInB(student, course, result)
            let resultC = await selectInB(student, course, result)
            result.result=resultA.result&&resultB.result&&resultC.result
            break
        default:
            break
    }
    return res.send(result)
}

async function addStuToA(student) {
    try {
        result = await axiosInstance.post(url_A + '/students', {
            params: {
                number: student.number,
                name: student.name,
                password: ''
            }
        })
    } catch (error) {
        console.log('添加学生进A出错')
    }
}

async function addStuToB(student) {
    try {
        result = await axiosInstance.get(url_B + '/addStudent', {
            params: {
                stu_id: student.number,
                stu_name: student.name
            }
        })
    } catch (error) {
        console.log('添加学生进B出错')
    }
}

async function addStuToC(student) {
    try {
        result = await formDataAxios.post(url_C + '/addStudent/', {
            username: student.number,
            name: student.name
        })
    } catch (error) {
        console.log('添加学生进C出错')
    }
}

module.exports = middleWare

async function selectInC(student, course, result) {
    try {
        let ans = await formDataAxios.post(url_C + '/add/', {
            username: student.number,
            id: course.number
        })
        result = ans.data
    } catch (error) {
        console.log('C选课出错')
    }
    return result
}

async function selectInB(student, course, result) {
    try {
        let ans = await axiosInstance.get(url_B + '/select', {
            params: {
                stu_id: student.number,
                course_id: course.number
            }
        })
        result = ans.data
    } catch (error) {
        console.log('B选课出错')
    }
    return result
}

async function selectInA(student, course, result) {
    try {
        let ans = await axiosInstance.get(url_A + '/api/chooseCourse', {
            params: {
                studentNumber: student.number,
                courseNumber: course.number
            }
        })
        result = ans.data
    } catch (error) {
        console.log('A选课出错')
    }
    return result
}
