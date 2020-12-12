import {
  // CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import SearchBar from "material-ui-search-bar";
import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import parse from "autosuggest-highlight/parse";
import useStyles from "./styles";
import { LocationOnTwoTone } from "@material-ui/icons";

const SearchBox = ({ panTo }) => {
  const classes = useStyles();
  const [inpValue, setInpValue] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const {
    ready,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 16.047079,
        lng: () => 108.20623,
      },
      radius: 200 * 1000,
    },
  });
  React.useEffect(() => {
    let active = true;
    if (inpValue === "") {
      setOptions([]);
      return undefined;
    }
    if (active) {
      setOptions(data);
      setValue(inpValue);
    }
    return () => {
      active = false;
    };
  }, [inpValue, data, setValue]);
  return (
    <div className={classes.searchContainer}>
      <Autocomplete
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description || ""
        }
        filterOptions={(x) => x}
        autoComplete
        includeInputInList
        filterSelectedOptions
        options={options}
        value={selected}
        onChange={async (event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue.description, false);
          setSelected(newValue.description);
          clearSuggestions();
          setSelected(null);
          try {
            const results = await getGeocode({
              address: newValue.description,
            });
            const latLng = await getLatLng(results[0]);
            panTo(latLng);
          } catch (error) {}
        }}
        onInputChange={(event, newInputValue) => setInpValue(newInputValue)}
        getOptionSelected={(option, value) => option.description === value}
        renderInput={(params) => (
          <TextField
            {...params}
            disabled={!ready}
            variant="outlined"
            placeholder="Enter your locations..."
            fullWidth
          />
        )}
        renderOption={(option) => {
          const matches =
            option.structured_formatting?.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting?.main_text,
            matches?.map((match) => [match.offset, match.offset + match.length])
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnTwoTone className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    </div>
  );
};

export default SearchBox;

// InputProps={{
//   ...params.InputProps,
//   endAdornment: (
//     <React.Fragment>
//       {!status === "OK" ? (
//         <CircularProgress color="inherit" size={20} />
//       ) : null}
//       {params.InputProps.endAdornment}
//     </React.Fragment>
//   ),
// }}
