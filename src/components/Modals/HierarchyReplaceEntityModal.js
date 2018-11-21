import React, { Component, PropTypes } from 'react'
import { entitySets } from '../../lib/configuration'
import { connect } from 'react-redux'
import { selectors } from '../../redux/entities'
import { actions } from '../../redux/editor'

@connect((state, props) => ({
  sourceEntity: selectors.getById(state, props.options.sourceId, false),
  targetEntity: selectors.getByShortid(state, props.options.targetShortId, false)
}), { ...actions })
export default class ReplaceEntityModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired
  }

  replace () {
    const { sourceEntity, targetEntity, options, hierarchyMove, close } = this.props

    close()

    hierarchyMove({
      id: sourceEntity._id,
      entitySet: sourceEntity.__entitySet
    }, {
      shortid: targetEntity.shortid,
      children: options.targetChildren
    }, options.shouldCopy, true, false)
  }

  cancel () {
    this.props.close()
  }

  componentDidMount () {
    if (!this.cancelBtn) {
      return
    }

    setTimeout(() => this.cancelBtn.focus(), 0)
  }

  render () {
    const { sourceEntity, targetEntity, options } = this.props

    if (!sourceEntity || !targetEntity) {
      return <div />
    }

    const sourceEntityName = sourceEntity[entitySets[sourceEntity.__entitySet].nameAttribute]
    const sourceEntitySetVisibleName = entitySets[sourceEntity.__entitySet].visibleName || entitySets[sourceEntity.__entitySet].name
    const targetEntityName = targetEntity[entitySets[targetEntity.__entitySet].nameAttribute]
    const shouldCopy = options.shouldCopy

    return (
      <div>
        <div>
          <b>{shouldCopy ? 'Copy' : 'Move'}</b> failed. Entity <b>{sourceEntityName}</b> ({sourceEntitySetVisibleName}) already exists in target folder <b>{targetEntityName}</b>.
          <br />
          Do you want to replace it?
        </div>
        <div className='button-bar'>
          <button className='button danger' onClick={() => this.replace()}>Yes</button>
          <button className='button confirmation' ref={(el) => { this.cancelBtn = el }} onClick={() => this.cancel()}>Cancel</button>
        </div>
      </div>
    )
  }
}
