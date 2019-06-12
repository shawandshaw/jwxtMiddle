const axiosInstance  =require('../axiosInstance')
const {url_A,url_B,url_C} =require('../urlConfig')

let middleWare=async (req, res) => {
    switch (course.college) {
        case '建筑学院':
            try {
                result = await axiosInstance.get(url_A + '/api/cancelCourse', {
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
                result = await axiosInstance.get(url_B + '/cancle', {
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
                result = await axiosInstance.post(url_C + '/quit', {
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
module.exports=middleWare