import { useEffect } from "react"
import UltimateGuitarService from "../UltimateGuitarService";

export function BandView() {

  useEffect(() => {
    UltimateGuitarService.getChords().then((response) => {
      console.log('CHORDS');
      console.log(response);
    });
  });

  useEffect(() => {
    UltimateGuitarService.getTabs().then((response) => {
      console.log('TABS');
      for (let x = 0; x < response.lyrics.length; x++) {
        console.log(response.lyrics[x]);
        if (x === 5) {
          console.log('\n');
        }
      }
    });
  });

  return (
    <p>Band View Works!</p>
  )
}