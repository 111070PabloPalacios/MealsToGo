import React, { useEffect , useState, useContext } from "react";
import { View } from 'react-native';
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { LocationsContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurant/restaurants.context"; 

export const Search = () => {
    //Guarda la keywoard solamente cuando se corre la funcion search
    const { keyword, search } = useContext(LocationsContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    //Cuando la barra de busqueda este montada, busquemos la keyword
    //Se remueve este useEffect ya que si bien es funcional, puede llegar a 
    //ocasionar problemas en el futuro, de todas formas, es util al principio
    //del desarrollo y sirve para ver que nuestra funcionalidad de busqueda funcione
    /*useEffect(() => {
      search(searchKeyword);
    }, [])*/

    useEffect(() => {
        setSearchKeyword(keyword);
    },[keyword])

  return (
    <SearchView>
      <Searchbar 
      placeholder="Search..." 
      value={searchKeyword}
      icon="map"
      onSubmitEditing={() => {
          search(searchKeyword);
      }}
      onChangeText={(text) => {
        setSearchKeyword(text)
      }}
      />
    </SearchView>
  );
};

const SearchView = styled(View)`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 30px;
  width: 100%;
`;
