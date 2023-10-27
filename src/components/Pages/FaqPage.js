import {View, Text, Image, Pressable } from 'react-native';
import { PAGE_IDS } from '../../util/constants';
import Navbar from '../Navbar';
import { Background, Container, Rect, Bold, C, R } from "../layout"
import MyStatusBar from '../MyStatusBar';
import { PEOPLE_NAMES } from "../../env"
import { useState } from 'react';
import Link from '../Link';

const PEOPLE_IMAGES = [
  require("../../../assets/page-specific/faq/people/1.png"),
  require("../../../assets/page-specific/faq/people/2.png"),
  require("../../../assets/page-specific/faq/people/3.png"),
  require("../../../assets/page-specific/faq/people/4.png"),
]

function PersonImage({index}) {
  return <C style={{padding: 5}}>
    <Image source={PEOPLE_IMAGES[index]} style={{resizeMode: "cover", position: "absolute", height: "100%", width: "100%", borderRadius: 5, left: 5, top: 5}}/>
    <View style={{position: "absolute", bottom: 0, right: 0, left: 0}}>
      <C style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
        <C style={{backgroundColor: "rgb(168, 95, 141)", padding: 1, paddingHorizontal: 2, marginLeft: 3, borderRadius: 3}}>
          <Text style={{fontSize: 13, color: "white"}}>{PEOPLE_NAMES[index]}</Text>
        </C>
      </C>
    </View>
  </C>
}

export default function FaqPage({data, setData}) {
  return <Container>
    <Background source={require("../../../assets/page-specific/faq/Background.png")}/>
    <MyStatusBar backgroundColor={"black"}/>
    <Rect height={10}/>
    <Bold style={{color: "white", fontSize: 30, paddingLeft: 10}}>Who are we? من نحن</Bold>
    <Rect height={3}/>
    <Rect color={"white"} width={310} height={3}/>
    <Text style={{fontSize: 20, color: "white", paddingVertical: 10, paddingHorizontal: 20, height: "30%", overflow: "hidden"}}>
      {PEOPLE_NAMES[0]}, {PEOPLE_NAMES[1]}, {PEOPLE_NAMES[2]}, and {PEOPLE_NAMES[3]} all met in middle school in Minnesota. Now seniors, we are building this app with the non-profit AIM to AID. It is a great match for our aspirations, combing Aid to Aid's goals and our passion for computer science.
    </Text>
    <Rect height={"10%"}/>
    <Bold style={{fontSize: 30, marginLeft: 10}}>Creators مبتدع</Bold>
    <Rect height={3}/>
    <Rect color={"black"} width={"100%"} height={3} style={{marginLeft: 10}}/>
    <R>
      <PersonImage index={0}/>
      <PersonImage index={1}/>
      <Rect width={"35%"}/>
    </R>
    <R>
      <Rect width={"15%"}/>
      <PersonImage index={2}/>
      <PersonImage index={3}/>
      <Rect width={"20%"}/>
    </R>
    <Rect height={60}/>

    <View style={{position: "absolute", width: "42%", height: "35%", right: 0, top: "38%", overflow: "hidden"}}>
      <Background source={require("../../../assets/page-specific/faq/SideBubble.png")}/>
      <C style={{alignItems: "flex-end", paddingVertical: "17%", paddingRight: 5, justifyContent: "center"}}>
        <C style={{alignItems: "flex-end"}}>
          <Bold style={{color: "white"}}>
            Website
          </Bold>
          <Link url={"https://www.hsaimtoaid.org/"}>
            <Bold style={{color: "white", fontSize: 13, textDecorationLine: "underline"}}>
              hsaimtoaid.org
            </Bold>
          </Link>
        </C>
        <C style={{alignItems: "flex-end"}}>
          <Bold style={{color: "white"}}>
            Clothing Line
          </Bold>
          <Link url={"https://crescentwear.com/"}>
            <Bold style={{color: "white", fontSize: 13, textDecorationLine: "underline"}}>
              crescentwear.com
            </Bold>
          </Link>
        </C>
        <C style={{alignItems: "flex-end"}}>
          <Bold style={{color: "white"}}>
            AIM to AID Instagram
          </Bold>
          <Link url={"https://www.instagram.com/aimtoaid_/"}>
            <Bold style={{color: "white", fontSize: 13, textDecorationLine: "underline"}}>
              aimtoaid_
            </Bold>
          </Link>
        </C>
        <C style={{alignItems: "flex-end"}}>
          <Bold style={{color: "white"}}>
            Clothing Instagram
          </Bold>
          <Link url={"https://www.instagram.com/crescent_wear/"}>
            <Bold style={{color: "white", fontSize: 13, textDecorationLine: "underline"}}>
              crescent_wear
            </Bold>
          </Link>
        </C>
        <C style={{alignItems: "flex-end"}}>
          <Bold style={{color: "white"}}>
            MN Instagram
          </Bold>
          <Link url={"https://www.instagram.com/aimtoaid.mn/"}>
            <Bold style={{color: "white", fontSize: 13, textDecorationLine: "underline"}}>
              aimtoaid.mn
            </Bold>
          </Link>
        </C>
      </C>
    </View>
    <Navbar pageId={data.pageId} setPageId={(pageId) => setData({...data, pageId})}/>
  </Container>
}
