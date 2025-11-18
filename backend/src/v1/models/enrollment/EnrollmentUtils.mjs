import Course from '../course/Course.mjs'
import Enrollment from './Enrollment.mjs'
class EnrollmentUtils {

    static async getUserById(filters, type = 'find', populateFields = []) {
        try {
            let query
            if (type == 'findOne') {
                query = Enrollment.findOne(filters)
            } else {
                query = Enrollment.find(filters)
            }
            populateFields.forEach((field) => {
                if (typeof field === 'string') {
                    // Якщо поле передано як рядок
                    query = query.populate(field)
                } else if (
                    typeof field === 'object' &&
                    field.fieldForPopulation &&
                    field.requiredFieldsFromTargetObject
                ) {
                    // Якщо передано об'єкт з полем для заповнення та запитуваними полями
                    query = query.populate(
                        field.fieldForPopulation,
                        field.requiredFieldsFromTargetObject
                    )
                }
            })
            return await query.exec()
        } catch (err) {
            console.error('Error in getUserCourse:', err);
            return []
        }
    }

    static async createEnroll(data) {
        try {
            const newItem = new Enrollment(data)
            return await newItem.save()
        } catch (error) {
            throw new Error('Error creating data: ' + error.message)
        }
    }

    static async getCourseWithLessons(courseId) {
        return Course.findById(courseId).populate('lessons').exec();
    }


}

export default EnrollmentUtils