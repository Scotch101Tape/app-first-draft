import MapView, {Geojson, Marker, Circle} from "react-native-maps"
import { View, Button, Text, Image, ScrollView, Pressable, FlatList, StyleSheet, useWindowDimensions, ActivityIndicator, Platform, UIManager, LayoutAnimation } from 'react-native';
import Navbar from '../Navbar'
import { useState, useRef, useEffect } from 'react';
import { CODES, findPlaces, findPlacesTest, placeDetails } from '../../util/places';
import Requires from '../Requires';
import { Container, Background , R, C, Bold, Nothing, Rect} from '../layout';
import MyStatusBar from '../MyStatusBar';
import Link from "../Link"
import PlaceCodePicker from '../PlaceCodePicker';
import FetchContent from '../FetchContent';

// TODO for deployment https://docs.expo.dev/versions/latest/sdk/map-view/

// Adapted from https://reactnative.dev/docs/layoutanimation.html
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function Loading({color, size}) {
  return <C style={{justifyContent: "center", alignItems: "center"}}>
    <ActivityIndicator color={color} size={size ? size : "large"}/>
  </C>
}

function InfoCard({info, onClose, data, setData}) {
  const {width: windowWidth} = useWindowDimensions()

  // Trim the name to 30 chars and add a ... if needed
  const name = info.name
  // Trim United States/the country off of the address
  const address = ((x) => x.substring(0, x.length - x.split("").reverse().findIndex(i => i == ",") - 1))(info.formatted_address)
  // Get the rating
  const rating = "⭐⭐⭐⭐⭐".substring(0, Math.max(Math.round(info.rating), 1))
  // Is it open??
  const isOpen = info.opening_hours ? (info.opening_hours.open_now ? "Open" : "Closed") : ""
  const isOpenStyle = isOpen == "Open" ? {color: "green"} : {color: "red"}

  return <C style={{backgroundColor: "white", borderRadius: 10, paddingHorizontal: 3}}>
    <R style={{alignItems: "center"}}>
      <Text style={{fontWeight: "bold", fontSize: 20, width: windowWidth - 53}}>{name}</Text>
    </R>
    <C>
      <FetchContent
        args={{placeId: info.place_id}}
        fetcher={({placeId}) => {
          return placeDetails({placeId})
        }}
        getCache={({placeId}) => {
          return data.places?.details?.[placeId]
        }}
        updateCache={({args: {placeId}, result}) => {
          setData({
            ...data,
            places: {
              ...data.places,
              // index by nearby
              details: {
                ...data.places?.details,
                // index by placeId
                [placeId]: result
              }
            }
          })
        }}
        loading={() => {
          return <Loading color={"black"} size={"small"}/>
        }}
        fail={() => {
          return <Loading color={"black"} size={"small"}/>
        }}
        success={result => {
          const website = result.website
          const address = info.formatted_address
          const phone = result.international_phone_number

          return <C>
            {address ?
            <View>
              <Bold style={{paddingTop: 10}}>Address عنوان</Bold>
              <Link url={(() => {
                const latlng = `${info.geometry.location.lat},${info.geometry.location.lng}`
                const label = info.name
                return Platform.OS === "ios" ?
                `maps://0,0?q="${label}"@${latlng}` :
                `geo:0,0?q=${latlng}(${label})`
              })()}>{address}</Link>
            </View> :
            <View/>}
            {website ?
            <View>
              <Bold style={{paddingTop: 10}}>Website عنوان موقع ويب</Bold>
              {/* Better than regex ©️ */}
              <Link url={website}>{website.substring(0, website.length - (website[website.length - 1] === "/")).replaceAll("https://", "").replaceAll("http://", "").replaceAll("www.", "")}</Link>
            </View> :
            <View/>}
            {phone ?
            <View>
              <Bold style={{paddingTop: 10}}>Phone رقم الهاتف</Bold>
              <Link url={`tel:${phone.replaceAll(" ", "").replaceAll("-", "")}`}>{phone}</Link>
            </View> :
            <View/>}
            <View style={{paddingBottom: 10}}/>
          </C>
        }}
      />
    </C>
    <R>
      <R style={{alignItems: "center"}}>
        <Text style={{...isOpenStyle, fontWeight: "bold"}}>{isOpen}</Text>
      </R>
      <R style={{justifyContent: "flex-end", alignItems: "center", paddingBottom: 3}}>
        <Text>{rating}</Text>
      </R>
    </R>
    <Pressable style={{position: "absolute", right: 0, top: 0, padding: 5, backgroundColor: "white"}} onPress={onClose}>
      <Image source={require("../../../assets/page-specific/map/Cross.png")} style={{width: 20, height: 20}}/>
    </Pressable>
  </C>
}

export default function MapPage({data, setData}) {
  // TODO, load more
  const [picked, setPicked] = useState(null)
  const [code, setCode] = useState(CODES.GROCERY)

  const onPressMarker = (placeId) => {
    setPicked(placeId)
    LayoutAnimation.configureNext({
      duration: 700,
      create: {type: "spring", springDamping: 0.5, property: "opacity"},
      update: {type: 'spring', springDamping: 0.5},
      delete: {type: "linear", property: "opacity"}
    })
  }

  const onClose = () => {
    onPressMarker(null)
  }

  const onPressPlaceCodePicker = (code) => {
    setCode(code)
    setPicked(null)
  }

  return <Container>
    <MapView
      style={{position: "absolute", width: "100%", height: "100%"}}
      initialRegion={{latitude: data.location.coords.latitude, longitude: data.location.coords.longitude, latitudeDelta: 1, longitudeDelta: 1}}
      mapPadding={{bottom: 50, top: 75}}
    >
      <FetchContent
        args={{code}}
        getCache={({code}) => {
          return data.places?.nearby?.[code]
        }}
        updateCache={({args: {code}, result}) => {
          setData({
            ...data,
            places: {
              ...data.places,
              // index by nearby
              nearby: {
                ...data.places?.nearby,
                // index by code
                [code]: result
              }
            }
          })
        }}
        fetcher={({code}) => findPlaces({code, location: [data.location.coords.latitude, data.location.coords.longitude]})}
        loading={() => {
          // TODO, have this work
          return <Nothing/>
        }}
        fail={() => {
          return <Nothing/>
        }}
        success={result => {
          const pickedInfoIndex = result.findIndex(info => info.place_id === picked)

          let operatedResult
          if (pickedInfoIndex !== -1) {
            // pickedInfo.current = result[pickedInfoIndex]
            operatedResult = new Array().concat(result.slice(0, pickedInfoIndex), result.slice(pickedInfoIndex + 1), result[pickedInfoIndex])
          } else {
            operatedResult = result
          }

          return operatedResult.map(info => {
            return <Marker
              onPress={() => onPressMarker(info.place_id)}
              key={info.place_id}
              coordinate={{latitude: info.geometry.location.lat, longitude: info.geometry.location.lng}}
            >
              <Image
                source={info.place_id === picked ? require("../../../assets/page-specific/map/PickedPlace.png") : require("../../../assets/page-specific/map/Place.png")}
              />
            </Marker>
          })
        }}
      />
    </MapView>
    <MyStatusBar backgroundColor={"black"}/>
    <View style={{width: "100%", height: 90}}>
      <PlaceCodePicker selected={code} onPress={onPressPlaceCodePicker}/>
    </View>
    <Requires
      requisite={() => {
        let info = undefined
        if (picked) {
          info = data.places?.nearby?.[code]?.find(item => item.place_id === picked)
        }
        return [info && picked, {info}]
      }}
      success={({info}) => {
        return <View style={{position: "absolute", width: "100%", paddingHorizontal: 10, bottom: 85}}>
          <InfoCard onClose={onClose} info={info} data={data} setData={setData}/>
        </View>
      }}
      fail={() => {
        return <Nothing/>
      }}
    />
    <Navbar setPageId={(pageId) => setData({...data, pageId})} pageId={data.pageId}/>
  </Container>
}
