import { View, Button, Text, Image, ScrollView, Pressable, FlatList, useWindowDimensions, ActivityIndicator, Platform } from 'react-native';
import Navbar from '../Navbar'
import DemoBox from '../DemoBox';
import { useState, useRef, useEffect } from 'react';
import { CODES, findPlaces, findPlacesTest, placeDetails } from '../../util/places';
import Requires from '../Requires';
import { Container, Background , R, C, centerStyle, Bold} from '../layout';
import MyStatusBar from '../MyStatusBar';
import Link from "../Link"

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

function MaxInfoCard({width, info, extraInfo, loading}) {
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
        {
          (() => {
            if (loading) {
              return <Loading color={"black"} size={"small"}/>
            } else if (extraInfo) {
              const website = extraInfo.website
              const address = info.item.formatted_address
              const phone = extraInfo.international_phone_number

              return <C>
                {address ?
                <View>
                  <Bold style={{paddingTop: 10}}>Address عنوان</Bold>
                  <Link text={address} url={(() => {
                    const latlng = `${info.item.geometry.location.lat},${info.item.geometry.location.lng}`
                    const label = info.item.name
                    return Platform.OS === "ios" ?
                    `maps://0,0?q="${label}"@${latlng}` :
                    `geo:0,0?q=${latlng}(${label})`
                  })()}/>
                </View> :
                <View/>}
                {website ?
                <View>
                  <Bold style={{paddingTop: 10}}>Website عنوان موقع ويب</Bold>
                  <Link text={website} url={website}/>
                </View> :
                <View/>}
                {phone ?
                <View>
                  <Bold style={{paddingTop: 10}}>Phone رقم الهاتف</Bold>
                  <Link text={phone} url={`tel:${phone.replaceAll(" ", "").replaceAll("-", "")}`}/>
                </View> :
                <View/>}
                <View style={{paddingBottom: 10}}/>
              </C>
            } else {
              return <Loading color={"black"} size={"small"}/>
            }
          })()
        }
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

function InfoCardList({results, windowWidth, data, setData}) {
  const [expanded, setExpanded] = useState(null)
  const [expandedInfo, setExpandedInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const fetching = useRef(null)

  const placeDetailsRoutine = (placeId) => {
    if (fetching.current !== placeId) {
      fetching.current = placeId
      new Promise((res, rej) => {
        const cache = data.places?.details?.[placeId]
        if (cache) {
          // data from cache
          res([true, cache])
        } else {
          // fetch data
          res(
            Promise.all([
              false,
              placeDetails({placeId})
            ])
          )
        }
      })
      .then(([cacheUsed, result]) => {
        if (!cacheUsed && result) {
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
        }

        if (fetching.current === placeId) {
          setExpandedInfo(result)
          setLoading(false)
        }
      })
      .catch(error => {
        console.warn(error)
        if (fetching.current === placeId) {
          setLoading(true)
        }
      })
    }
  }

  return <View>
    <FlatList
      data={results}
      renderItem={info => {
        if (info.item.place_id === expanded) {
          return <MaxInfoCard width={windowWidth - 20} info={info} extraInfo={expandedInfo} loading={loading}/>
        } else {
          const onPress = () => {
            setExpanded(info.item.place_id)
            setExpandedInfo(null)
            setLoading(true)
            placeDetailsRoutine(info.item.place_id)
          }
          return <MiniInfoCard width={windowWidth - 20} height={70} info={info} onPress={onPress}/>
        }
      }}
      keyExtractor={_ => Math.round(Math.random() * 1e10)}
      extraData={[loading]}
    />
  </View>
}

function FindButton({code, text, pressed, onPressFind}) {
  return <Pressable style={{marginRight: 10}} onPress={() => onPressFind({code})}>
    <C style={[centerStyle, {padding: 5, borderRadius: 25 /* equal to this padding plus the inside's border radius*/, borderColor: code === pressed ? "white" : (0, 0, 0, 0), borderWidth: 3}]}>
      <C style={{justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: "white", padding: 10}}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{text}</Text>
      </C>
    </C>
  </Pressable>
}

export default function InfoPage({setData, data}) {
  /*
  request && !loading: undisplay results, undisplay retry, display loading, display which one is being loaded
    -> good results: display results, undisplay loading
    -> bad results: display retry, undisplay loading

  request && loading

  On start: send request
  */
  const {width: windowWidth} = useWindowDimensions()

  const [loading, setLoading] = useState(true)
  const [pressed, setPressed] = useState(null)
  const [retry, setRetry] = useState(null)
  const [results, setResults] = useState(null)
  const fetching = useRef(null)

  function findPlacesRoutine({code}) {
    if ((pressed !== code && fetching.current !== code) || retry) {
      fetching.current = code
      setLoading(true)
      setRetry(false)
      setResults(null) // TODO change this so I put results in store to be passed around app..
      setPressed(code)

      new Promise((res, rej) => {
        const cache = data.places?.nearby?.[code]
        if (cache) {
          // data from cache
          res([true, cache])
        } else {
          // fetch data
          // TODO: what if data doesn't have location..
          res(
            Promise.all([
              false,
              findPlaces({code, location: [data.location.coords.latitude, data.location.coords.longitude]})
            ])
          )
        }
      })
      .then(([cacheUsed, result]) => {
        if (!cacheUsed && result) {
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
        }

        if (fetching.current === code) {
          setResults(result)
          setLoading(false)
        }
      })
      .catch(error => {
        console.warn(error)
        if (fetching.current === code) {
          setRetry(true)
          setLoading(false)
        }
      })
    }
  }

  useEffect(() => {
    findPlacesRoutine({code: CODES.GROCERY})
  }, [])

  function onPressFind({code}) {
    findPlacesRoutine({code})
  }

  return <Container>
    <Background source={require("../../../assets/page-specific/info/Background.png")}/>
    <MyStatusBar backgroundColor={"black"}/>
    <View style={{flexGrow: 0, width: "100%", height: 80 }}>
      <ScrollView style={{padding: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>
        <R style={{justifyContent: "space-around", alignItems: "center"}}>
          <FindButton text={"Halal Grocery بقالة حلال"} code={CODES.GROCERY} pressed={pressed} onPressFind={onPressFind}/>
          <FindButton text={"Clothing ملابس"} code={CODES.CLOTHING} pressed={pressed} onPressFind={onPressFind}/>
          <FindButton text={"Mosques مسجد"} code={CODES.MOSQUE} pressed={pressed} onPressFind={onPressFind}/>
        </R>
      </ScrollView>
    </View>
    <View style={{height: 60, width: "100%"}}>
      <Text style={{fontWeight: "bold", color: "white", fontSize: 30, marginLeft: 10}}>Near you بالقرب منك</Text>
      <View style={{height: 2, width: 300, backgroundColor: "white", marginTop: 3}}></View>
    </View>
    <C grow={80}>
      {
        (() => {
          if (loading) {
            return <Loading color={"white"}/>
          } else if (retry) {
            // If its a retry, it might as well be over...
            return <Loading color={"white"}/>
          } else if (results !== null) {
            return <InfoCardList results={results} windowWidth={windowWidth} data={data} setData={setData}/>
          } else {
            throw "WHAT"
          }
        })()
      }
    </C>
    <View style={{height: 65, width: "100%"}}/>
    <Navbar setPageId={(pageId) => setData({...data, pageId})} pageId={data.pageId}/>
  </Container>
}
