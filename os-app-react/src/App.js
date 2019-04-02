import React, { Component, Fragment } from 'react'
import { Modal, Progress, Spin } from 'antd'

import './App.css'

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

    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.showModal = this.showModal.bind(this)
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
      }
    }, 500)
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
          <div
            id="copyToUSBButton"
            onClick={() => this.setState({ copyingModalOpen: true }, this.startCountDown)}
          >
            Copy to USB
          </div>
        </div>
        <Modal
          title={<div>{folderOpenName}</div>}
          visible={folderOpen}
          onOk={this.handleOk}
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
          onCancel={() => this.setState({ copyingModalOpen: false, copyingPercent: 0 })}
          title="Copying to USB"
          visible={copyingModalOpen}
        >
          <div className="copy-modal">
            <h3>
              {copyingPercent < 100 ? (
                <Fragment>
                  <Spin /> Copying data to USB, please wait...
                </Fragment>
              ) : (
                'Copy complete!'
              )}
            </h3>
            <br />
            <br />
            <Progress percent={copyingPercent} status="active" />
          </div>
        </Modal>
      </div>
    )
  }
}

export default App
