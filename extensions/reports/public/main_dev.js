import ReportEditor from './ReportEditor'
import ReportsButton from './ReportsButton'
import DownloadButton from './DownloadButton.js'
import DeleteButton from './DeleteButton.js'
import Studio from 'jsreport-studio'

Studio.registerTabEditorComponent('reports', ReportEditor)
Studio.registerSettingsToolbarComponent(ReportsButton)


Studio.registerToolbarComponent(DownloadButton)
Studio.registerToolbarComponent(DeleteButton)