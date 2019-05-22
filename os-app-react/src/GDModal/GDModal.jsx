import _ from 'lodash'
import React, { Component, Fragment, useState } from 'react'
import { Breadcrumb, Icon, Modal } from 'antd'

import './GDModal.less'

const CarteIsland = () => {
  const [visibleArea, setVisibleArea] = useState(null)
  return (
    <div id="mapWrapper">
      <map name="carteMap">
        <area
          shape="poly"
          coords="8,16, 177,32, 153,157, 54,161"
          onMouseEnter={() => setVisibleArea('aquaticArea')}
          onMouseLeave={() => setVisibleArea(null)}
          alt="Aquatic Area"
        />
        <area
          shape="poly"
          coords="406,58, 485,67, 521,78, 496,126, 447,132, 427,155, 388,134, 295,163, 288,116"
          onMouseEnter={() => setVisibleArea('birdsArea')}
          onMouseLeave={() => setVisibleArea(null)}
          alt="Birds Area"
        />
        <area
          shape="poly"
          coords="523,101, 537,137, 522,195, 495,235, 376,306, 328,294, 298,162, 388,133, 433,157, 452,134"
          onMouseEnter={() => setVisibleArea('tropicalForestArea')}
          onMouseLeave={() => setVisibleArea(null)}
          alt="Tropical Forest Area"
        />
        <area
          shape="poly"
          coords="523,101, 563,108, 590,169, 587,288, 436,338, 298,162, 388,133, 433,157, 452,134"
          onMouseEnter={() => setVisibleArea('temperedArea')}
          onMouseLeave={() => setVisibleArea(null)}
          alt="Tempered Area"
        />
        <area
          shape="poly"
          coords="587,288, 656,286, 721,297, 750,363, 728,432, 643,421, 591,383, 552,297"
          onMouseEnter={() => setVisibleArea('desertArea')}
          onMouseLeave={() => setVisibleArea(null)}
          alt="Desert Area"
        />
      </map>
      {visibleArea === 'aquaticArea' && (
        <div onMouseEnter={() => setVisibleArea('aquaticArea')} id="aquaticArea">
          AQUATIC AREA
        </div>
      )}
      {visibleArea === 'birdsArea' && (
        <div onMouseEnter={() => setVisibleArea('birdsArea')} id="birdsArea">
          BIRDS AREA
        </div>
      )}
      {visibleArea === 'tropicalForestArea' && (
        <div onMouseEnter={() => setVisibleArea('tropicalForestArea')} id="tropicalForestArea">
          TROPICAL FOREST AREA
        </div>
      )}
      {visibleArea === 'temperedArea' && (
        <div onMouseEnter={() => setVisibleArea('temperedArea')} id="temperedArea">
          TEMPERED AREA
        </div>
      )}
      {visibleArea === 'desertArea' && (
        <div onMouseEnter={() => setVisibleArea('desertArea')} id="desertArea">
          DESERT AREA
        </div>
      )}
      <img width="100%" src="./carte-ile-vide.jpg" useMap="#carteMap" alt="Map" />
    </div>
  )
}

const EraList = () => {
  const [activeEra, setActiveEra] = useState(null)
  const [activeDino, setActiveDino] = useState(null)
  const eraDinos = {
    carboniferous: [
      'archaeothyris',
      'casineria',
      'dunkleosteus',
      'gephyrostegus',
      'hylonomus',
      'meganeura-monyi',
      'megarachne-servinei',
      'microbrachis',
      'paleothyris',
      'pulmonoscorpius',
    ],
  }

  if (activeEra) {
    return (
      <Fragment>
        <h2 role={activeDino ? 'button' : ''} onClick={() => setActiveDino(null)}>
          {activeDino ? (
            <Fragment>
              <Icon type="left" /> Retour
            </Fragment>
          ) : (
            _.startCase(activeEra)
          )}
        </h2>
        {activeDino ? (
          <img width="100%" src={`./${activeEra}/${activeDino}.png`} useMap="#carteMap" alt="Map" />
        ) : (
          <div className="folder-container">
            {(eraDinos[activeEra] || []).map(dinoName => (
              <div
                key={dinoName}
                className="folder folder-small"
                onClick={() => setActiveDino(dinoName)}
              >
                <div className="folder-name folder-name-dark">{_.startCase(dinoName)}</div>
              </div>
            ))}
          </div>
        )}
      </Fragment>
    )
  }

  return (
    <div>
      <div className="folder folder-small" onClick={() => setActiveEra('carboniferous')}>
        <div className="folder-name folder-name-dark">Carboniferous</div>
      </div>
      <div
        className="folder folder-small"
        onClick={() => this.setState({ setActiveEra: 'permian' })}
      >
        <div className="folder-name folder-name-dark">Permian</div>
      </div>
      <div
        className="folder folder-small"
        onClick={() => this.setState({ setActiveEra: 'triassic' })}
      >
        <div className="folder-name folder-name-dark">Triassic</div>
      </div>
      <div
        className="folder folder-small"
        onClick={() => this.setState({ setActiveEra: 'jurassic' })}
      >
        <div className="folder-name folder-name-dark">Jurassic</div>
      </div>
      <div
        className="folder folder-small"
        onClick={() => this.setState({ setActiveEra: 'cretaceous' })}
      >
        <div className="folder-name folder-name-dark">Cretaceous</div>
      </div>
      <div
        className="folder folder-small"
        onClick={() => this.setState({ setActiveEra: 'paleogene' })}
      >
        <div className="folder-name folder-name-dark">Paleogene</div>
      </div>
      <div
        className="folder folder-small"
        onClick={() => this.setState({ setActiveEra: 'neogene' })}
      >
        <div className="folder-name folder-name-dark">Neogene</div>
      </div>
    </div>
  )
}

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
    this.setState({ activeSection: '', folderOpen: false })
  }

  handleCancel() {
    this.setState({ activeSection: '', folderOpen: false })
  }

  showModal(folderName) {
    this.setState({
      folderOpen: true,
    })
  }

  renderList() {
    return <EraList />
    // return <embed src="./SPECIES-INDEX.pdf" width="100%" height="700" type="application/pdf" />
  }

  renderAnimation() {
    return (
      <video width="100%" controls={false} preload autoPlay loop>
        <source src="./video.mov" type="video/mp4" />
      </video>
    )
  }

  renderIsland() {
    return <CarteIsland />
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
              <div
                className="folder folder-small"
                onClick={() => this.setState({ activeSection: 'List' })}
              >
                <div className="folder-name folder-name-dark">List</div>
              </div>
              <div
                className="folder folder-small"
                onClick={() => this.setState({ activeSection: 'Animation' })}
              >
                <div className="folder-name folder-name-dark">Animation</div>
              </div>
              <div
                className="folder folder-small"
                onClick={() => this.setState({ activeSection: 'Island' })}
              >
                <div className="folder-name folder-name-dark">Island</div>
              </div>
            </Fragment>
          )}
        </Modal>
      </Fragment>
    )
  }
}

export default GDModal
