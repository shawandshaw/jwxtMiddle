const {axiosInstance,formDataAxios}  =require('../axiosInstance')
const {url_A,url_B,url_C} =require('../urlConfig')
let course=async (req, res) => {
    axiosInstance.defaults.headers.get['Cookie'] = req.headers.cookie
    let stuNumber = req.query.number;
    let courses = []
    try {
        let { data: A_total_course } = await axiosInstance.get(
            url_A + '/courses'
        )
        let { data: A_selected_course } = await axiosInstance.get(
            url_A + '/api/myCourses'
        )
        for (let course of A_total_course) {
            if (A_selected_course.findIndex(e => e.number == course.number) >= 0) {
                course.isSelected = true
            } else {
                course.isSelected = false
            }
            course.college = course.number[0]=='A'?'建筑学院':'公选课程'
            
            insertCourse(course, courses);
            
        }
    } catch (error) {
        console.log('A获取课程出错')
    }
    try {
        let {
            data: B_course
        } = await axiosInstance.get(url_B + '/courses', {
            params: {
                stu_id: stuNumber
            }
        })
        for (const c of B_course) {
            let course={
                number: c.course.id,
                name: c.course.name,
                college: c.course.id[0]=='B'?'软件学院':'公选课程',
                isSelected: c.select
            }
            insertCourse(course,courses)
        }
    } catch (error) {
        console.log('B获取课程出错')
    }

    try {
        let { data: C_myCourses_string } = await formDataAxios.post(
            url_C + '/getMy/',{
                username: stuNumber
            }
        )
        let C_select_course = C_myCourses_string.split('_')
        let { data: C_otherCourses_string } = await formDataAxios.post(
            url_C + '/getOther/', {
                username: stuNumber
            }
        )
        let C_notSelect_course = C_otherCourses_string.split('_')
        for (let i = 0; i+1 < C_select_course.length; i = i + 2) {
            const number = C_select_course[i]
            const name = C_select_course[i + 1]
            let course={
                number: number,
                name: name,
                college: number[0]=='C'?'历史学院':'公选课程',
                isSelected: true
            }
            insertCourse(course,courses)
        }
        for (let i = 0; i +1< C_notSelect_course.length; i = i + 2) {
            const number = C_notSelect_course[i]
            const name = C_notSelect_course[i + 1]
            let course={
                number: number,
                name: name,
                college: number[0]=='C'?'历史学院':'公选课程',
                isSelected: false
            }
            insertCourse(course,courses)
        }
    } catch (error) {
        console.log('C获取课程出错')
    }

    return res.send(courses)
}
module.exports = course

function insertCourse(course, courses) {
    if (course.college == '公选课程') {
        let index = courses.findIndex(c => c.number == course.number);
        let exist = courses[index];
        if (!exist) {
            courses.push(course);
        }
        else if (!exist.isSelected) {
            Object.assign(courses[index], course);
        }
    }else{
        courses.push(course)
    }
}
