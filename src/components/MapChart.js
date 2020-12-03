import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { spiData, getScore } from '../services/SocialProgress';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

function scoreToColor(score) {
	var r, g, b = 0;
	if(score < 50) {
		r = 255;
		g = Math.round(5.1 * score);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * score);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
};

const MapChart = ({ setTooltipContent }) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  //with Redux onMouseEnter will have to be dispatched.

                  // `${()=>getScore(geo.properties.NAME, geo.properties.NAME_LONG, spiData)
                  //   .then(SCORE => {
                  //     scoreToColor(SCORE)
                  //   })}`

                  // May have to extract onMouseEnter/onMouseLeave and set it a prop function to work with Redux
                  onMouseEnter={() => {
                    const { NAME, POP_EST, NAME_LONG } = geo.properties;
                    getScore(NAME, NAME_LONG, spiData).then((SCORE) => {
                      console.log(NAME + ' : ' + SCORE);
                      setTooltipContent(`${NAME} — ${rounded(POP_EST)}, Social Progress Index - ${SCORE}`);
                      let color = scoreToColor(SCORE)
                    })
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

MapChart.propTypes = {
  setTooltipContent: PropTypes.func.isRequired
};
//connect or memo, or both? 
export default connect()(memo(MapChart));
