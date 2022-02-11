import React, { useEffect , useState, useContext } from "react";
import { View } from 'react-native';
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { LocationsContext } from "../../../services/location/location.context";

export const Search = ({isFavouritesToggled, onFavouritesToggle}) => {
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

  //Se asegura de pasar la busqueda de maps a restaurants
    useEffect(() => {
      setSearchKeyword(keyword);
  },[keyword])

  return (
    <SearchView>
      <Searchbar 
      placeholder="Search..."
      icon={isFavouritesToggled ? "heart" : "heart-outline"}
      onIconPress={onFavouritesToggle}
      value={searchKeyword}
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
  padding-bottom: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
`;
