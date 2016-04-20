import ScheduleEditor from './ScheduleEditor.js'
import ScheduleProperties from './ScheduleProperties.js'

Studio.registerEntitySet({ name: 'schedules', faIcon: 'fa-calendar', visibleName: 'schedule' })
Studio.registerTabEditorComponent('schedules', ScheduleEditor)
Studio.properties.push(ScheduleProperties)
