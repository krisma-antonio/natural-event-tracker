import React from 'react';
import { BiSolidDonateHeart } from "react-icons/bi";
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Donate',
    path: '/donate',
    icon: <BiSolidDonateHeart />,
    cName: 'nav-text'
  }
];