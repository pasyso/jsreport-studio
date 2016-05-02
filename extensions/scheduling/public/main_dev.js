import ScheduleEditor from './ScheduleEditor.js'
import ScheduleProperties from './ScheduleProperties.js'
import DownloadButton from './DownloadButton.js'
import Studio from 'jsreport-studio'

Studio.initializeListeners.push(async () => {
  if (Studio.authentication && !Studio.authentication.user.isAdmin) {
    return
  }

  Studio.addEntitySet({ name: 'schedules', faIcon: 'fa-calendar', visibleName: 'schedule' })
  Studio.addTabEditorComponent('schedules', ScheduleEditor)
  Studio.addPropertyComponent(ScheduleProperties.title, ScheduleProperties, (entity) => entity.__entitySet === 'schedules')
  Studio.addToolbarComponent(DownloadButton)
})
