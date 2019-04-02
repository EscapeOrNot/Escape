import React, { Component, Fragment } from 'react'
import { Breadcrumb, Button, Icon, Modal } from 'antd'

class GDModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSection: '',
      folderOpen: false,
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

  renderList() {
    return
  }

  renderAnimation() {
    return (
      <video width="100%" controls={false} preload autoPlay loop>
        <source src="./video.mov" type="video/mp4" />
      </video>
    )
  }

  render() {
    const { activeSection, folderOpen } = this.state

    return (
      <Fragment>
        <div className="folder" onClick={() => this.showModal('Project Gen Dynamics')}>
          <div className="folder-name">Project Gen Dynamics</div>
        </div>
        <Modal
          footer={null}
          mask={false}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          style={{ top: 20 }}
          title={
            <Breadcrumb>
              <Breadcrumb.Item role="button" onClick={() => this.setState({ activeSection: '' })}>
                <Icon type="folder-open" theme="filled" /> Project Gen Dynamics
              </Breadcrumb.Item>
              {!!activeSection && <Breadcrumb.Item>{activeSection}</Breadcrumb.Item>}
            </Breadcrumb>
          }
          visible={folderOpen}
          width={800}
        >
          {activeSection ? (
            this[`render${activeSection}`] && this[`render${activeSection}`]()
          ) : (
            <Fragment>
              <div className="folder folder-small" onClick={() => this.setState({ activeSection: 'Liste' })}>
                <div className="folder-name folder-name-dark">Liste</div>
              </div>
              <div className="folder folder-small" onClick={() => this.setState({ activeSection: 'Animation' })}>
                <div className="folder-name folder-name-dark">Animation</div>
              </div>
              <div className="folder folder-small" onClick={() => this.setState({ activeSection: 'Île' })}>
                <div className="folder-name folder-name-dark">Île</div>
              </div>
            </Fragment>
          )}
        </Modal>
      </Fragment>
    )
  }
}

export default GDModal
