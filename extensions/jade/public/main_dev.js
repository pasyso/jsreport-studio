import Studio from 'jsreport-studio'
import 'brace/mode/jade'

Studio.templateEditorModeResovlers.push((template) => template.engine === 'jade' ? 'jade' : null)
