import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import SuggestionAddressLocation from "./SuggestionAddressLocation";
import { useMediaQuery } from "react-responsive";

const AddLocation = ({ values, setValues, handleFuctionClick, locationName = false }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [address, setAddress] = React.useState("");
  const [mapCenter, setMapCenter] = React.useState({
    longitude: 0,
    latitude: 0,
  });

  const handleChange = (address) => {
    setValues((prevValues) => ({
      ...prevValues,
      location: {
        address: address,
      },
    }));
    setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => {
        const result = results[0];
        const latLng = getLatLng(result);
        let city = "", state = "", country = "", district = "", zipCode = "";
        for (let component of result.address_components) {
          const types = component.types;
          if (types.includes("locality")) {
            city = component.long_name;
          } else if (types.includes("administrative_area_level_1")) {
            state = component.long_name;
          } else if (types.includes("country")) {
            country = component.long_name;
          } else if (types.includes("sublocality_level_1")) {
            district = component.long_name;
          } else if (types.includes("postal_code")) {
            zipCode = component.long_name;
            
          }
        }

        return Promise.all([latLng, { city, state, country, district, zipCode }]);
      })
      .then(([latLng, locationDetails]) => {
        setMapCenter({
          longitude: latLng.lng,
          latitude: latLng.lat,
        });
        setValues({
          ...values,
          location: {
            longitude: latLng.lng,
            latitude: latLng.lat,
            address,
            zipCode: locationDetails.zipCode,
            city: locationDetails.city,
            state: locationDetails.state,
            country: locationDetails.country,
            district: locationDetails.district,
          },
        });
      })
      .catch((error) => console.error("Error", error));
  };
  return (
    <div>
      <div>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div className="pin-top">
              <label className="font-16px black-text">
                {locationName ? locationName : "Location"}<span className="red-text">*</span>
              </label>
              <input
                {...getInputProps({})}
                className={`input-tag-style ${isMobile && "input-width"}`}
                value={values?.location?.address}
                placeholder="Enter Location"
              />
              <SuggestionAddressLocation
                suggestions={suggestions}
                getSuggestionItemProps={getSuggestionItemProps}
              />
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDsVU8VuCB3p7REGp24SbXZnkNXHaIKCfo",
})(AddLocation);