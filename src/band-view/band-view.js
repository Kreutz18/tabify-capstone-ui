import { Tab } from "bootstrap";
import { Row, Tabs } from "react-bootstrap";
import UltimateGuitarService from "../UltimateGuitarService";
import "./band-view.scss";

export function BandView(props) {
  return (
    <NavigationTabs />
  )

  function SixString() {
    console.log(props.track);
    UltimateGuitarService.getTabs(props.track.name, props.track.artists[0].name).then((response) => {
      console.log(response);
    });
  }

  function NavigationTabs() {
    return (
      <>
        <Row>
          <div className="flex-container mb-4" style={{paddingLeft: '0px'}}>
            <h4>{props.track.name}</h4>&nbsp; - &nbsp;<h6 style={{fontWeight: '400'}}>{props.track.artists[0].name}</h6>
          </div>
        </Row>
        <Tabs>
          <Tab eventKey="lyrics" title="Lyrics">

          </Tab>
          <Tab eventKey="6-string" title="6-String">
            <SixString />
          </Tab>
          <Tab eventKey="bass" title="Bass">

          </Tab>
        </Tabs>
      </>
    )
  }
}