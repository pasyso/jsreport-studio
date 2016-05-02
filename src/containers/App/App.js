import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { actions, selectors } from 'redux/editor'
import * as entities from 'redux/entities'
import Preview from '../../components/Preview/Preview.js'
import EntityTree from '../../components/EntityTree/EntityTree.js'
import Properties from '../../components/Properties/Properties.js'
import style from './App.scss'
import Toolbar from '../../components/Toolbar/Toolbar.js'
import _debounce from 'lodash/debounce'
import Helmet from 'react-helmet'
import SplitPane from '../../components/common/SplitPane/SplitPane.js'
import EditorTabs from '../../components/Tabs/EditorTabs.js'
import TabTitles from '../../components/Tabs/TabTitles.js'
import Modal from '../Modal/Modal.js'
import NewEntityModal from '../../components/Modals/NewEntityModal.js'
import DeleteConfirmationModal from '../../components/Modals/DeleteConfirmationModal.js'
import * as progress from '../../redux/progress'
import { triggerSplitResize, registerPreviewHandler, entitySets } from '../../lib/configuration.js'

const progressActions = progress.actions

@connect((state) => ({
  entities: state.entities,
  references: entities.selectors.getReferences(state),
  activeTabKey: state.editor.activeTabKey,
  activeTabWithEntity: selectors.getActiveTabWithEntity(state),
  isPending: progress.selectors.getIsPending(state),
  canRun: selectors.canRun(state),
  canSave: selectors.canSave(state),
  canSaveAll: selectors.canSaveAll(state),
  canRemove: selectors.canRemove(state),
  tabsWithEntities: selectors.getTabWithEntities(state),
  activeEntity: selectors.getActiveEntity(state),
  lastActiveTemplate: selectors.getLastActiveTemplate(state)
}), { ...actions, ...progressActions })
export default class App extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  static propTypes = {
    entities: PropTypes.object,
    references: PropTypes.object,
    tabsWithEntities: PropTypes.array,
    currentDetail: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  };

  componentDidMount () {
    this.setUpDebouncedUpdate()
    registerPreviewHandler((src) => {
      if (!src) {
        this.handleRun()
      }
    })

    if (this.props.params.shortid) {
      this.props.openTab({ shortid: this.props.params.shortid, entitySet: this.props.params.entitySet })
      return
    }

    this.openStartup()
  }

  componentDidUpdate () {
    this.props.updateHistory()
  }

  setUpDebouncedUpdate () {
    this.update = _debounce(this.props.update, 5000, { leading: true })
  }

  async handleRun () {
    this.update.flush()

    if (!/Trident/i.test(navigator.userAgent) && !/MSIE/i.test(navigator.userAgent) && !/Edge/i.test(navigator.userAgent)) {
      this.props.start()
    }

    this.props.run()
  }

  openModal (componentOrText, options) {
    this.refs.modal.open(componentOrText, options)
  }

  save () {
    this.update.flush()
    this.setUpDebouncedUpdate()
    return this.props.save()
  }

  saveAll () {
    this.update.flush()
    this.setUpDebouncedUpdate()
    return this.props.saveAll()
  }

  handleSplitChanged () {
    triggerSplitResize()
    this.refs.preview.resizeStarted()
  }

  openStartup () {
    this.props.openTab({ key: 'StartupPage', editorComponentKey: 'startup', title: 'Statup' })
  }

  handleSplitDragFinished () {
    this.refs.preview.resizeEnded()
  }

  render () {
    const { tabsWithEntities, references, isPending, canRun, canSave, canRemove, canSaveAll, activeTabWithEntity, entities,
      openTab, end, activateTab, activeTabKey, activeEntity, update, closeTab } = this.props

    return (
      <div className='container'>
        <Helmet />
        <Modal ref='modal' />

        <div className={style.appContent + ' container'}>
          <div className='block'>
            <Toolbar
              canRun={canRun} canSave={canSave} canSaveAll={canSaveAll} canRemove={canRemove} onSave={() => this.save()}
              onSaveAll={() => this.saveAll()} isPending={isPending} activeTab={activeTabWithEntity} onUpdate={update}
              onRemove={() => this.openModal(DeleteConfirmationModal, {_id: activeEntity._id})}
              onRun={() => this.handleRun()} openStartup={() => this.openStartup()} />

            <div className='block'>
              <SplitPane
                resizerClassName='resizer' defaultSize='80%' onChange={() => this.handleSplitChanged()}
                onDragFinished={() => this.handleSplitDragFinished()}>
                <SplitPane
                  resizerClassName='resizer-horizontal' split='horizontal'
                  defaultSize={(window.innerHeight * 0.4) + 'px'}>
                  <EntityTree
                    activeEntity={activeEntity} entities={references} onClick={(_id) => openTab({_id: _id})}
                    onNewClick={(es) => entitySets[es].onNew ? entitySets[es].onNew() : this.openModal(NewEntityModal, {entitySet: es})} />
                  <Properties entity={activeEntity} entities={entities} onChange={update} />
                </SplitPane>

                <div className='block'>
                  <TabTitles
                    activeTabKey={activeTabKey} activateTab={activateTab} tabs={tabsWithEntities} closeTab={closeTab} />
                  <SplitPane
                    onChange={() => this.handleSplitChanged()} onDragFinished={() => this.handleSplitDragFinished()}
                    resizerClassName='resizer'>
                    <EditorTabs
                      activeTabKey={activeTabKey} onUpdate={(v) => this.update(v)} tabs={tabsWithEntities} />
                    <Preview ref='preview' onLoad={end} />
                  </SplitPane>
                </div>
              </SplitPane>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
