import ScheduleEditor from './ScheduleEditor.js'
import ScheduleProperties from './ScheduleProperties.js'
import DownloadButton from './DownloadButton.js'
import Studio from 'jsreport-studio'

Studio.initializeListeners.push(async () => {
  if (Studio.authentication && !Studio.authentication.user.isAdmin) {
    return
  }

  Studio.registerEntitySet({ name: 'schedules', faIcon: 'fa-calendar', visibleName: 'schedule' })
  Studio.registerTabEditorComponent('schedules', ScheduleEditor)
  Studio.registerPropertyComponent(ScheduleProperties.title, ScheduleProperties, (entity) => entity.__entitySet === 'schedules')
  Studio.registerToolbarComponent(DownloadButton)
})
