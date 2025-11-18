import Enrollment from './Enrollment.mjs'
class EnrollmentUtils {

    static async getUserById(filters, type = 'find') {
        try {
            let query
            if (type == 'findOne') {
                query = Enrollment.findOne(filters)
            } else {
                query = Enrollment.find(filters)
            }
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


}

export default EnrollmentUtils