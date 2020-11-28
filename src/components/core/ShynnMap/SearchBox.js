import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const SearchBox = () => {
  const {} = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 16.047079,
        lng: () => 108.20623,
      },
      radius: 200 * 1000,
    },
  });
  return <div></div>;
};

export default SearchBox;
