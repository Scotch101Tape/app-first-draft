import { View, Button, Text, Image, ScrollView, Pressable, FlatList, useWindowDimensions, ActivityIndicator, Platform, UIManager, LayoutAnimation } from 'react-native';
import Navbar from '../Navbar'
import { useState, useRef, useEffect } from 'react';
import { CODES, findPlaces, findPlacesTest, placeDetails } from '../../util/places';
import Requires from '../Requires';
import { Container, Background , R, C, centerStyle, Bold} from '../layout';
import MyStatusBar from '../MyStatusBar';
import Link from "../Link"
import { PAGE_IDS } from '../../util/constants';
import PlaceCodePicker from "../PlaceCodePicker"
import FetchContent from '../FetchContent';

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

function MiniInfoCard({width, height, info, onPress}) {
  // Trim the name to 30 chars and add a ... if needed
  const name = info.item.name.substring(0, 30) + (info.item.name.length > 30 ? "..." : "")
  // Trim United States/the country off of the address
  const address = ((x) => x.substring(0, x.length - x.split("").reverse().findIndex(i => i == ",") - 1))(info.item.formatted_address)
  // Get the rating
  const rating = "⭐⭐⭐⭐⭐".substring(0, Math.max(Math.round(info.item.rating), 1))
  // Is it open??
  const isOpen = info.item.opening_hours ? (info.item.opening_hours.open_now ? "Open" : "Closed") : ""
  const isOpenStyle = isOpen == "Open" ? {color: "green"} : {color: "red"}

  return <Pressable onPress={onPress} style={{width, height, marginBottom: 20, marginLeft:10, marginRight: 10, paddingHorizontal: 3, overflow: "hidden", backgroundColor: "white", borderRadius: 5}}>
    <C>
      <R style={{alignItems: "center"}}>
        <Bold style={{fontSize: 20}}>{name}</Bold>
      </R>
      <R style={{alignItems: "center"}}>
        <Text>{address}</Text>
      </R>
      <R>
        <R style={{alignItems: "center"}}>
          <Bold style={isOpenStyle}>{isOpen}</Bold>
        </R>
        <R style={{justifyContent: "flex-end", alignItems: "center"}}>
          <Text>{rating}</Text>
        </R>
      </R>
    </C>
  </Pressable>
}

function MaxInfoCard({width, info, data, setData}) {
  // Trim the name to 30 chars and add a ... if needed
  const name = info.item.name
  // Trim United States/the country off of the address
  const address = ((x) => x.substring(0, x.length - x.split("").reverse().findIndex(i => i == ",") - 1))(info.item.formatted_address)
  // Get the rating
  const rating = "⭐⭐⭐⭐⭐".substring(0, Math.max(Math.round(info.item.rating), 1))
  // Is it open??
  const isOpen = info.item.opening_hours ? (info.item.opening_hours.open_now ? "Open" : "Closed") : ""
  const isOpenStyle = isOpen == "Open" ? {color: "green"} : {color: "red"}

  return <View style={{width, marginBottom: 20, marginLeft:10, marginRight: 10, paddingHorizontal: 3, overflow: "hidden", backgroundColor: "white", borderRadius: 5}}>
    <C>
      <R style={{alignItems: "center"}}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{name}</Text>
      </R>
      <C>
        <FetchContent
          args={{placeId: info.item.place_id}}
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
            const address = info.item.formatted_address
            const phone = result.international_phone_number

            return <C>
              {address ?
              <View>
                <Bold style={{paddingTop: 10}}>Address عنوان</Bold>
                <Link url={(() => {
                  const latlng = `${info.item.geometry.location.lat},${info.item.geometry.location.lng}`
                  const label = info.item.name
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
    </C>
  </View>
}

function InfoCardList({result, windowWidth, data, setData}) {
  const [expanded, setExpanded] = useState(null)

  return <View>
    <FlatList
      data={result}
      renderItem={info => {
        if (info.item.place_id === expanded) {
          return <MaxInfoCard width={windowWidth - 20} info={info} data={data} setData={setData}/>
        } else {
          const onPress = () => {
            setExpanded(info.item.place_id)
            LayoutAnimation.configureNext({
              duration: 700,
              update: {type: 'spring', springDamping: 1},
            })
          }
          return <MiniInfoCard width={windowWidth - 20} height={70} info={info} onPress={onPress}/>
        }
      }}
      extraData={[expanded]}
    />
  </View>
}

export default function InfoPage({setData, data}) {
  const {width: windowWidth} = useWindowDimensions()

  const [code, setCode] = useState(CODES.GROCERY)

  const onPressPlaceCodePicker = (code) => {
    setCode(code)
    LayoutAnimation.configureNext({
      duration: 1000,
      create: {type: 'spring', springDamping: 0.5, property: 'opacity'},
      update: {type: 'spring', springDamping: 1},
      delete: {type: 'spring', springDamping: 0.5, property: 'opacity'}
    })
  }

  return <Container>
    <Background source={require("../../../assets/page-specific/info/Background.png")}/>
    <MyStatusBar backgroundColor={"black"}/>
    <View style={{width: "100%", height: 90}}>
      <PlaceCodePicker selected={code} onPress={onPressPlaceCodePicker}/>
    </View>
    <View style={{height: 60, width: "100%"}}>
      <Text style={{fontWeight: "bold", color: "white", fontSize: 30, marginLeft: 10}}>Near you بالقرب منك</Text>
      <View style={{height: 2, width: 300, backgroundColor: "white", marginTop: 3}}></View>
    </View>
    <C grow={80}>
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
          return <Loading color={"white"}/>
        }}
        fail={() => {
          return <Loading color={"white"}/>
        }}
        success={result => {
          return <InfoCardList result={result} windowWidth={windowWidth} data={data} setData={setData}/>
        }}
      />
    </C>
    <View style={{height: 65, width: "100%"}}/>
    <Navbar setPageId={(pageId) => setData({...data, pageId})} pageId={data.pageId}/>
  </Container>
}
