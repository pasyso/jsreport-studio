import React, { Component } from 'react'
import {
  modalHandler
} from '../../lib/configuration'
import NewFolderModal from '../Modals/NewFolderModal'
import EntityTreeButton from './EntityTreeButton'

class EntityTreeNewFolderButton extends Component {
  render () {
    return (
      <div title='Add new folder' style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        <EntityTreeButton onClick={() => modalHandler.open(NewFolderModal, {})}>
          <span style={{ display: 'inline-block' }}>
            <i className='fa fa-folder' />
          </span>
        </EntityTreeButton>
      </div>
    )
  }
}

export default EntityTreeNewFolderButton
