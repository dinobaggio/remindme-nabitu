import moment from 'moment'

export default function validateReminders({
    titleVal,
    descriptionVal,
    remindAtVal,
    eventAtVal,
}, errors) {
    errors.value = []
    const errVal = errors.value

    if (!titleVal) {
        errVal.push('title is required')
    }
    if (!descriptionVal) {
        errVal.push('description is required')
    }
    if (!remindAtVal) {
        errVal.push('remind_at is required')
    }
    if (!eventAtVal) {
        errVal.push('event_at is required')
    }

    if (remindAtVal && eventAtVal && moment(remindAtVal).isAfter(eventAtVal)) {
        errVal.push('remind_at not greater than event_at')
    } else if (remindAtVal && moment(remindAtVal).isBefore(new Date())) {
        errVal.push('remind_at is not before today')
    } else if (eventAtVal && moment(eventAtVal).isBefore(new Date())) {
        errVal.push('event_at is not before today')
    }
    
    if (errVal.length > 0) {
        return false
    }

    return true
}