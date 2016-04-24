import ScheduleEditor from './ScheduleEditor.js'
import ScheduleProperties from './ScheduleProperties.js'
import DownloadButton from './DownloadButton.js'

Studio.registerEntitySet({ name: 'schedules', faIcon: 'fa-calendar', visibleName: 'schedule' })
Studio.registerTabEditorComponent('schedules', ScheduleEditor)
Studio.properties.push(ScheduleProperties)
Studio.registerToolbarComponent(DownloadButton)