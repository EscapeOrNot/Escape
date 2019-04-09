import React, { Component, Fragment } from 'react'
import { Modal, Progress, Spin } from 'antd'

import './App.less'

import GDModal from './GDModal/GDModal.jsx'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      copyingModalOpen: false,
      copyingPercent: 0,
      folderOpen: false,
      folderOpenName: '',
    }

    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.showModal = this.showModal.bind(this)
    this.startCountDown = this.startCountDown.bind(this)
  }

  handleOk() {
    this.setState({ folderOpen: false })
  }

  handleCancel() {
    this.setState({ folderOpen: false })
  }

  showModal(folderName) {
    this.setState({
      folderOpen: true,
      folderOpenName: folderName,
    })
  }

  startCountDown() {
    this.interval = setInterval(() => {
      const { copyingPercent } = this.state
      if (copyingPercent < 100) {
        this.setState({ copyingPercent: copyingPercent + 1 })
      } else {
        clearInterval(this.interval)
        this.interval = null
      }
    }, 1000)
  }

  render() {
    const { copyingModalOpen, copyingPercent, folderOpen, folderOpenName } = this.state

    return (
      <div className="App">
        <div className="folder" onClick={() => this.showModal('Project 1')}>
          <div className="folder-name">Project 1</div>
        </div>
        <GDModal />
        <div className="folder" onClick={() => this.showModal('Project 3')}>
          <div className="folder-name">Project 3</div>
        </div>
        <div className="folder" onClick={() => this.showModal('Project 4')}>
          <div className="folder-name">Project 4</div>
        </div>
        <div id="copyToUSBButtonContainer">
          {!this.interval ? (
            <div id="copyToUSBButton" onClick={this.startCountDown}>
              Copy to USB
            </div>
          ) : (
            <div className="copy-panel">
              <b>
                {copyingPercent < 100 ? (
                  <Fragment>
                    <Spin type="info" />
                    &nbsp;Copying data to USB, do not unplug <small>({copyingPercent}%)</small>
                  </Fragment>
                ) : (
                  'Copy complete!'
                )}
              </b>
              <Progress percent={copyingPercent} status="active" showInfo={false} />
            </div>
          )}
        </div>
        <Modal
          title={<div>{folderOpenName}</div>}
          visible={folderOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <p>foo...</p>
          <p>foo...</p>
          <p>foo...</p>
        </Modal>
        <Modal
          closable={copyingPercent >= 100}
          footer={null}
          maskClosable={copyingPercent >= 100}
          onCancel={() =>
            copyingPercent >= 100 && this.setState({ copyingModalOpen: false, copyingPercent: 0 })
          }
          title="Copying to USB"
          visible={copyingModalOpen}
        />
      </div>
    )
  }
}

export default App
