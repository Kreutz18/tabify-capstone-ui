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
  const [isLyricsSelected, setIsLyricsSelected] = useState(false);
  
  const hasBassTabs = false;


  useEffect(() => {
    setLoading(true);
    let promises = [
      UltimateGuitarService.getTabList(track.name, track.artists[0].name),
      SpotifyService.getLyrics(track.id)
    ];

    Promise.all(promises).then((responses) => {
      setTabs(responses[0].tabs);
      setSelectedLyrics(responses[1].lines);
      setLoading(false);
    });
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

  function NavigationTabs() {
    return (
      <>
        <Tabs
          activeKey={selectedNav}
          onSelect={(k) => setSelectedNav(k)}
        >
          <Tab active={selectedNav === NAV_TABS.LYRICS ? true : false} eventKey={NAV_TABS.LYRICS} title="Lyrics">
            {!loading && selectedLyrics && selectedNav === NAV_TABS.LYRICS && <DisplayLyrics />}
          </Tab>
          <Tab active={selectedNav === NAV_TABS.SIX_STRING ? true : false} eventKey={NAV_TABS.SIX_STRING} title="6-String">
            {!loading && !isGuitarTabSelected && <TabTable />}
            {!loading && isGuitarTabSelected && selectedGuitarTab && <TabDisplay />}
          </Tab>
          <Tab active={selectedNav === NAV_TABS.BASS ? true : false} eventKey={NAV_TABS.BASS} title="Bass">
            {!loading && !isBassTabSelected && <TabTable />}
            {!loading && isBassTabSelected && selectedBassTab && <TabDisplay />}
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
    var foundTabs = false;
    const rows = [];
    for (let x = 0; x < tabs.length; x++) {
      if (tabs[x].type === 'bass') {
        foundTabs = true;
        rows.push(
          <tr key={'bass-' + x}>
            <td className="align-left" key={'bass-songName-' + x}><a className="clickable" style={{fontColor: 'blue',textDecoration: 'none'}} onClick={() => getTabByUrl(tabs[x].href)}>{tabs[x].songName}</a></td>
            <td className="align-left" key={'bass-rating-' + x}>{tabs[x].rating}</td>
            <td className="align-left" key={'bass-type-' + x}>{tabs[x].type}</td>
          </tr>
        )
      }

      if(foundTabs = false)
      {
        rows.push(
          <tr>
            <td className="align-left">NO TABS FOUND!</td>
            <td className="align-left"></td>
            <td className="align-left"></td>
          </tr>
        )
      }
    }

    return rows;
  }

  function buildEmptyBassTableRows()
  {
    const rows = [];
    rows.push(
      <tr>
        <td className="align-left">NO TABS FOUND!</td>
        <td className="align-left"></td>
        <td className="align-left"></td>
      </tr>
    )
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

    return rows;
  }
}