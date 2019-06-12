const axiosInstance  =require('../axiosInstance')
const {url_A,url_B,url_C} =require('../urlConfig')

let middleWare=async (req, res) => {
    //处理内院选课和跨院系选课
    axiosInstance.defaults.headers.get['Cookie'] = req.headers.cookie
    let { student, course } = req.body
    if (student.college != course.college) {
        //跨院系选课需要添加学生到本院
        switch (course.college) {
            case '建筑学院':
                try {
                    result = await axiosInstance.post(url_A + '/students', {
                        params: {
                            number: student.number,
                            name: student.name,
                            password: ""
                        }
                    })
                } catch (error) {
                    console.log('A选课出错')
                }

                break
            case '软件学院':
                try {
                    result = await axiosInstance.get(url_B + '/addStudent', {
                        params: {
                            stu_id: student.number,
                            stu_name: student.name
                        }
                    })
                } catch (error) {
                    console.log('B选课出错')
                }

                break
            case '历史学院':
                try {
                    result = await axiosInstance.post(url_C + '/add', {
                        username: student.number,
                        courseId: course.number
                    })
                } catch (error) {
                    console.log('C选课出错')
                }

                break
            default:
                break
        }
    }
    let result = { result: false }
    switch (course.college) {
        case '建筑学院':
            try {
                result = await axiosInstance.get(url_A + '/api/chooseCourse', {
                    params: {
                        studentNumber: student.number,
                        courseNumber: course.number
                    }
                })
            } catch (error) {
                console.log('A选课出错')
            }

            break
        case '软件学院':
            try {
                result = await axiosInstance.get(url_B + '/select', {
                    params: {
                        stu_id: student.number,
                        course_id: course.number
                    }
                })
            } catch (error) {
                console.log('B选课出错')
            }

            break
        case '历史学院':
            try {
                result = await axiosInstance.post(url_C + '/add', {
                    username: student.number,
                    courseId: course.number
                })
            } catch (error) {
                console.log('C选课出错')
            }

            break
        default:
            break
    }
    return res.send(result)
}

module.exports = middleWare