import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import styled from "styled-components/native";
import { Search } from "../components/mapsearch.component";
import { MapCallout } from "../components/map-callout.component";
import { LocationsContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurant/restaurants.context";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationsContext);
  const { restaurants = [] } = useContext(RestaurantsContext);
  //Agarro viewport de location
  const { lat, lng, viewport } = location;
  console.log(viewport);
  const [latDelta, setLatDelta] = useState(0);

  //Calcula la posicion en la que deberia aparecer el marcador en el mapa.
  //Cambia cuando yo cambie la locacion.
  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    const latDelta = northeastLat - southwestLat;
    setLatDelta(latDelta);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <MapView.Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              {/*Renderiza los items al apretar en el marcador*/}
              <MapView.Callout
                onPress={() =>
                  //Le pasamos el nombre del componente al que queremos navegar 
                  //y el restaurante
                  navigation.navigate("RestaurantDetail", { restaurant })
                }
              >
                <MapCallout restaurant={restaurant} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
};
