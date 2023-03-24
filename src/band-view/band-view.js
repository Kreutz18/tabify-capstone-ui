import { useEffect } from "react"
import UltimateGuitarService from "../UltimateGuitarService";

export function BandView() {

  useEffect(() => {
    UltimateGuitarService.getTest().then((response) => {
      console.log(response);
    });
  });

  return (
    <p>Band View Works!</p>
  )
}