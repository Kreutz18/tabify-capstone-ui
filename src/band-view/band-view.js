import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "bootstrap";
import { useEffect, useState } from "react";
import { Button, Row, Table, Tabs } from "react-bootstrap";
import SpotifyService from "../spotify-service";
import UltimateGuitarService from "../UltimateGuitarService";
import "./band-view.scss";

const NAV_TABS = {
  LYRICS: 'LYRICS',
  SIX_STRING: 'SIX_STRING',
  BASS: 'BASS'
};

export function BandView({track}) {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState(null);
  const [selectedNav, setSelectedNav] = useState(NAV_TABS.SIX_STRING);
  const [selectedBassTab, setSelectedBassTab] = useState(null);
  const [isBassTabSelected, setIsBassTabSelected] = useState(false);
  const [selectedGuitarTab, setSelectedGuitarTab] = useState(null);
  const [isGuitarTabSelected, setIsGuitarTabSelected] = useState(false);
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [hasBassTabs, setHasBassTabs] = useState(true);
  const [hasGuitarTabs, setHasGuitarTabs] = useState(true);
  const [hasLyrics, setHasLyrics] = useState(true);
  


  useEffect(() => {
    setLoading(true);
    let promises = [
      UltimateGuitarService.getTabList(track.name, track.artists[0].name),
      SpotifyService.getLyrics(track.id)
    ];

    Promise.all(promises).then((responses) => {
      setTabs(responses[0].tabs);
      initializeTabState(responses[0].tabs);
      console.log(responses[1]);
      setSelectedLyrics(responses[1].error ? null : responses[1].lines);
      setHasLyrics(responses[1].error ? false : true);
      setLoading(false);
    })
  }, []);


  return (
    <>
      <Row>
        <div className="flex-container mb-4" style={{paddingLeft: '0px'}}>
          <h4>{track.name}</h4>&nbsp; - &nbsp;<h6 style={{fontWeight: '400'}}>{track.artists[0].name}</h6>
        </div>
      </Row>
      <NavigationTabs />
    </>
  )

  function initializeTabState(tabList) {
    var bassCount = 0;
    var guitarCount = 0;
    for (let x = 0; x < tabList.length; x++) {
      if (tabList[x].type === 'bass') {
        bassCount++;
      } else {
        guitarCount++;
      }
    }

    setHasBassTabs(bassCount > 0 ? true : false);
    setHasGuitarTabs(guitarCount > 0 ? true : false);
  }

  function NavigationTabs() {
    return (
      <>
        <Tabs
          style={{marginBottom: '10px'}}
          activeKey={selectedNav}
          onSelect={(k) => setSelectedNav(k)}
        >
          <Tab active={selectedNav === NAV_TABS.LYRICS ? true : false} eventKey={NAV_TABS.LYRICS} title="Lyrics">
            {!loading && selectedLyrics && selectedNav === NAV_TABS.LYRICS && <DisplayLyrics />}
            {!loading && !hasGuitarTabs && <h3>Lyrics for this track are not available</h3>}
          </Tab>
          <Tab active={selectedNav === NAV_TABS.SIX_STRING ? true : false} eventKey={NAV_TABS.SIX_STRING} title="6-String">
            {!loading && !isGuitarTabSelected && hasGuitarTabs && <TabTable />}
            {!loading && isGuitarTabSelected && selectedGuitarTab && <TabDisplay />}
            {!loading && !hasGuitarTabs && <h3>Guitar tabs this track are not available</h3>}
          </Tab>
          <Tab active={selectedNav === NAV_TABS.BASS ? true : false} eventKey={NAV_TABS.BASS} title="Bass">
            {!loading && !isBassTabSelected && hasBassTabs && <TabTable />}
            {!loading && isBassTabSelected && selectedBassTab && <TabDisplay />}
            {!loading && !hasBassTabs && <h3>Bass tabs for this track are not available</h3>}
          </Tab>
        </Tabs>
      </>
    )
  }

  function getTabByUrl(url) {
    setLoading(true);
    UltimateGuitarService.getTab(url).then((response) => {
      if (selectedNav === NAV_TABS.BASS) {
        setSelectedBassTab(response.tab);
        setIsBassTabSelected(true);
      } else if (selectedNav === NAV_TABS.SIX_STRING) {
        setSelectedGuitarTab(response.tab);
        setIsGuitarTabSelected(true);
      }

      setLoading(false);
    });
  }

  function backToTabs(TAB) {
    if (TAB === NAV_TABS.SIX_STRING) {
      setSelectedGuitarTab(null);
      setIsGuitarTabSelected(false);
    } else if (TAB === NAV_TABS.BASS) {
      setSelectedBassTab(null);
      setIsBassTabSelected(false);
    } else {

    }
  }

  function TabDisplay() {
    return (
      <>
        <Row>
          <div className='mb-2' style={{paddingLeft: '0px'}}>
            <Button variant='link' style={{float: 'left', textDecoration: 'none', paddingLeft: '0px'}} onClick={() => backToTabs(selectedNav)}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-left"/> Back to Tabs
            </Button>
          </div>
        </Row>
        <Row className="justify-content-center" style={{textAlign: 'start'}}>
          {isGuitarTabSelected && selectedNav === NAV_TABS.SIX_STRING && <pre>{selectedGuitarTab}</pre>}
          {isBassTabSelected && selectedNav === NAV_TABS.BASS && <pre>{selectedBassTab}</pre>}
        </Row>
      </>
    )
  }

  function DisplayLyrics() {
    let lyrics = '';
    for (let x = 0; x < selectedLyrics.length; x++) {
      lyrics += selectedLyrics[x].words + '\r\n';
    }
    return (
      <Row className="justify-content-center" style={{textAlign: 'start'}}>
        <pre>{lyrics}</pre>
      </Row>
    );
  }

  function TabTable() {
    return (
      <Table hover>
        <thead>
          <tr>
            <th className="align-left">Tab Name</th>
            <th className="align-left">Rating</th>
            <th className="align-left">Type</th>
          </tr>
        </thead>
        <tbody>
          {tabs && selectedNav === NAV_TABS.SIX_STRING && buildGuitarTableRows()}
          {tabs && selectedNav === NAV_TABS.BASS && buildBassTableRows()}
        </tbody>
      </Table>
    );
  }

  function buildBassTableRows() {
    const rows = [];
    for (let x = 0; x < tabs.length; x++) {
      if (tabs[x].type === 'bass') {
        rows.push(
          <tr key={'bass-' + x}>
            <td className="align-left" key={'bass-songName-' + x}><a className="clickable" style={{fontColor: 'blue',textDecoration: 'none'}} onClick={() => getTabByUrl(tabs[x].href)}>{tabs[x].songName}</a></td>
            <td className="align-left" key={'bass-rating-' + x}>{tabs[x].rating}</td>
            <td className="align-left" key={'bass-type-' + x}>{tabs[x].type}</td>
          </tr>
        )
      }
    }

    // setHasBassTabs(rows.length > 0 ? true : false);
    return rows;
  }

  function buildGuitarTableRows() {
    const rows = [];
    for (let x = 0; x < tabs.length; x++) {
      if (tabs[x].type !== 'bass') {
        rows.push(
          <tr key={'guitar-' + x}>
            <td className="align-left" key={'guitar-songName-' + x}><a className="clickable" style={{fontColor: 'blue',textDecoration: 'none'}} onClick={() => getTabByUrl(tabs[x].href)}>{tabs[x].songName}</a></td>
            <td className="align-left" key={'guitar-rating-' + x}>{tabs[x].rating}</td>
            <td className="align-left" key={'guitar-type-' + x}>{tabs[x].type}</td>
          </tr>
        )
      }
    }

    // setHasGuitarTabs(rows.length > 0 ? true : false);
    return rows;
  }
}