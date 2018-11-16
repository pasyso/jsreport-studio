import React, { Component, PropTypes } from 'react'

class HighlightedArea extends Component {
  getRelativePositionInsideContainer (containerDimensions, areaPosition, topOrLeft) {
    let position

    if (topOrLeft === 'top') {
      position = areaPosition - containerDimensions.top
    } else {
      position = areaPosition - containerDimensions.left
    }

    return position
  }

  render () {
    const { highlightedArea, getContainerDimensions } = this.props
    const offset = 2
    const COLOR = '#3397ea'

    if (!highlightedArea) {
      return null
    }

    const containerDimensions = getContainerDimensions()

    return (
      <div>
        {highlightedArea.label && (
          <div
            key='group-label'
            style={{
              position: 'absolute',
              top: `${this.getRelativePositionInsideContainer(containerDimensions, highlightedArea.label.top, 'top')}px`,
              left: `${this.getRelativePositionInsideContainer(containerDimensions, highlightedArea.label.left, 'left')}px`,
              width: `${highlightedArea.label.width + offset}px`,
              height: `${highlightedArea.label.height}px`,
              backgroundColor: COLOR,
              opacity: '0.4',
              marginLeft: `-${offset}px`,
              borderRadius: '2px'
            }}
          />
        )}
        {highlightedArea.hierarchy && (
          <div
            key='group-hierarchy'
            style={{
              position: 'absolute',
              top: `${this.getRelativePositionInsideContainer(containerDimensions, highlightedArea.hierarchy.top, 'top')}px`,
              left: `${this.getRelativePositionInsideContainer(containerDimensions, highlightedArea.hierarchy.left, 'left')}px`,
              width: typeof highlightedArea.hierarchy.width === 'string' ? highlightedArea.hierarchy.width : `${highlightedArea.hierarchy.width}px`,
              height: `${highlightedArea.hierarchy.height}px`,
              marginLeft: `-${offset}px`,
              borderLeft: `1px dotted ${COLOR}`,
              borderTop: `1px dotted ${COLOR}`,
              borderBottom: `1px dotted ${COLOR}`
            }}
          >
            <div style={{ position: 'absolute', top: '-2.5px', right: '0px', height: '5px', width: '5px', borderRadius: '100%', backgroundColor: COLOR }} />
            <div style={{ position: 'absolute', bottom: '-2.5px', right: '0px', height: '5px', width: '5px', borderRadius: '100%', backgroundColor: COLOR }} />
          </div>
        )}
      </div>
    )
  }
}

HighlightedArea.propTypes = {
  highlightedArea: PropTypes.object,
  getContainerDimensions: PropTypes.func
}

export default HighlightedArea
