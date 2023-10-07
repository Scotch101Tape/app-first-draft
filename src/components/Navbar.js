import { Pressable, Image } from "react-native"
import { memo } from 'react'
import { PAGE_IDS } from '../util/constants'
import {R, Container} from  "../components/layout"

const filledIcons = {
  map: require("../../assets/icons/filled/Map.png"),
  compass: require("../../assets/icons/filled/Compass.png"),
  faq: require("../../assets/icons/filled/FAQ.png"),
  info: require("../../assets/icons/filled/Info.png"),
  home: require("../../assets/icons/filled/Home.png"),
  resources: require("../../assets/icons/filled/Resources.png"),
  translator: require("../../assets/icons/filled/Translator.png"),
}

const noFillIcons = {
  map: require("../../assets/icons/no-fill/Map.png"),
  compass: require("../../assets/icons/no-fill/Compass.png"),
  faq: require("../../assets/icons/no-fill/FAQ.png"),
  info: require("../../assets/icons/no-fill/Info.png"),
  home: require("../../assets/icons/no-fill/Home.png"),
  resources: require("../../assets/icons/no-fill/Resources.png"),
  translator: require("../../assets/icons/no-fill/Translator.png"),
}

const pageData = {
  map: {
    filledIcon: filledIcons.map,
    noFillIcon: noFillIcons.map,
    pageId: PAGE_IDS.MAP
  },
  compass: {
    filledIcon: filledIcons.compass,
    noFillIcon: noFillIcons.compass,
    pageId: PAGE_IDS.COMPASS
  },
  faq: {
    filledIcon: filledIcons.faq,
    noFillIcon: noFillIcons.faq,
    pageId: PAGE_IDS.FAQ
  },
  info: {
    filledIcon: filledIcons.info,
    noFillIcon: noFillIcons.info,
    pageId: PAGE_IDS.INFO
  },
  home: {
    filledIcon: filledIcons.home,
    noFillIcon: noFillIcons.home,
    pageId: PAGE_IDS.HOME
  },
  resources: {
    filledIcon: filledIcons.resources,
    noFillIcon: noFillIcons.resources,
    pageId: PAGE_IDS.RESOURCES
  },
  translator: {
    filledIcon: filledIcons.translator,
    noFillIcon: noFillIcons.translator,
    pageId: PAGE_IDS.TRANSLATOR
  },
}

function IconButton({pageId, setPageId, pageData}) {
  return <Pressable style={{}} onPress={() => pageData.pageId === pageId || setPageId(pageData.pageId)}>
    <Image style={{}} source={pageData.pageId === pageId ? pageData.filledIcon : pageData.noFillIcon}/>
  </Pressable>
}

function Navbar({setPageId, pageId}) {
  // I choose to do boilerplate here rather than shorter code bc I think thats right with jsx
  return <Container style={{position: "absolute", bottom: 0, width: "100%", padding: 10, /*backgroundColor: "green"*/}}>
    <R style={{borderRadius: 10, backgroundColor: "white", justifyContent: "space-around", padding: 3, alignItems: "center"}}>
      <IconButton pageId={pageId} setPageId={setPageId} pageData={pageData.translator}/>
      <IconButton pageId={pageId} setPageId={setPageId} pageData={pageData.resources}/>
      <IconButton pageId={pageId} setPageId={setPageId} pageData={pageData.info}/>
      <IconButton pageId={pageId} setPageId={setPageId} pageData={pageData.home}/>
      <IconButton pageId={pageId} setPageId={setPageId} pageData={pageData.faq}/>
      <IconButton pageId={pageId} setPageId={setPageId} pageData={pageData.map}/>
      <IconButton pageId={pageId} setPageId={setPageId} pageData={pageData.compass}/>
    </R>
  </Container>
}

export default memo(Navbar)
