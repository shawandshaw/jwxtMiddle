const axiosInstance  =require('../axiosInstance')
const {url_A,url_B,url_C} =require('../urlConfig')
let course=async (req, res) => {
    axiosInstance.defaults.headers.get['Cookie'] = req.headers.cookie
    let courses = []
    try {
        let { data: A_total_course } = await axiosInstance.get(
            url_A + '/courses'
        )
        let { data: A_selected_course } = await axiosInstance.get(
            url_A + '/api/myCourses'
        )
        for (let c of A_total_course) {
            if (A_selected_course.findIndex(e => e.number == c.number) >= 0) {
                c.isSelected = true
            } else {
                c.isSelected = false
            }
            c.college = c.number[0]=='A'?'建筑学院':'公选课程'
            courses.push(c)
        }
    } catch (error) {
        console.log('A获取课程出错')
    }
    try {
        let {
            data: { CourseIsSelect: B_course }
        } = await axiosInstance.get(url_B + '/courses')
        for (const c of B_course) {
            courses.push({
                number: c.BCourse.id,
                name: c.BCourse.name,
                college: c.BCourse.id[0]=='B'?'软件学院':'公选课程',
                isSelected: c.isSelect
            })
        }
    } catch (error) {
        console.log('B获取课程出错')
    }

    try {
        let { data: C_myCourses_string } = await axiosInstance.get(
            url_C + '/getMy'
        )
        let C_select_course = C_myCourses_string.split('_')
        let { data: C_otherCourses_string } = await axiosInstance.get(
            url_C + '/getOther'
        )
        let C_notSelect_course = C_otherCourses_string.split('_')
        for (let i = 0; i < C_select_course.length; i = i + 2) {
            const number = C_select_course[i]
            const name = C_select_course[i + 1]
            courses.push({
                number: number,
                name: name,
                college: number[0]=='C'?'历史学院':'公选课程',
                isSelected: true
            })
        }
        for (let i = 0; i < C_notSelect_course.length; i = i + 2) {
            const number = C_notSelect_course[i]
            const name = C_notSelect_course[i + 1]
            courses.push({
                number: number,
                name: name,
                college: number[0]=='C'?'历史学院':'公选课程',
                isSelected: false
            })
        }
    } catch (error) {
        console.log('C获取课程出错')
    }

    return res.send(courses)
}
module.exports = course