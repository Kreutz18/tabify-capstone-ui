import { Tab } from "bootstrap";
import { Tabs } from "react-bootstrap";

export function BandView() {

  return (
    <NavigationTabs />
  )

  function NavigationTabs() {
    return (
      <Tabs>
        <Tab eventKey="lyrics" title="Lyrics">

        </Tab>
        <Tab eventKey="6-string" title="6-String">

        </Tab>
        <Tab eventKey="bass" title="Bass">

        </Tab>
      </Tabs>
    )
  }
}