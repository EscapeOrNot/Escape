import React, { Component, Fragment } from 'react'
import { Modal, Progress, Spin } from 'antd'

import './App.less'

import GDModal from './GDModal/GDModal.jsx'

// Total load duration: 10 minutes
const loadDuration = 10 * 60 * 1000

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      copyingModalOpen: false,
      copyingPercent: 0,
      countDownRunning: false,
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
    const { countDownRunning } = this.state
    if (countDownRunning || (this.interval !== null && this.interval !== undefined)) {
      return
    }

    this.setState({ countDownRunning: true })

    this.interval = setInterval(() => {
      const { copyingPercent } = this.state
      if (copyingPercent < 100) {
        this.setState({ copyingPercent: copyingPercent + 1 })
      } else {
        clearInterval(this.interval)
        this.interval = null
      }
    }, loadDuration / 100)
  }

  render() {
    const {
      copyingModalOpen,
      copyingPercent,
      countDownRunning,
      folderOpen,
      folderOpenName,
    } = this.state

    return (
      <div className="App">
        <div className="folder" onClick={() => this.showModal('Project 1')}>
          <div className="folder-name">DNA Sequencing</div>
        </div>
        <GDModal />
        <div className="folder" onClick={() => this.showModal('Project 3')}>
          <div className="folder-name">Classical Genetic Research</div>
        </div>
        <div className="folder" onClick={() => this.showModal('Project 4')}>
          <div className="folder-name">Genetic Characterization</div>
        </div>
        <div id="copyToUSBButtonContainer">
          {!countDownRunning ? (
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
          width={800}
        >
          <embed
            src={
              folderOpenName === 'Project 1'
                ? process.env.PUBLIC_URL + '/DNA-SEQUENCING.pdf'
                : (folderOpenName === 'Project 3' &&
                    process.env.PUBLIC_URL + '/CLASSICAL-GENETIC-RESEARCH.pdf') ||
                  process.env.PUBLIC_URL + '/GENETIC-CHARACTERIZATION.pdf'
            }
            width="100%"
            height="600"
            type="application/pdf"
          />
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
