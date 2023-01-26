

const date0= new Date();
date0.setDate(date0.getDate()-6)
let day0=date0.toDateString()

const date1= new Date();
date1.setDate(date1.getDate()-5)
let day1=date1.toDateString()

const date2= new Date();
date2.setDate(date2.getDate()-4)
let day2=date2.toDateString()

const date3= new Date();
date3.setDate(date3.getDate()-3)
let day3=date3.toDateString()

const date4= new Date();
date4.setDate(date4.getDate()-2)
let day4=date4.toDateString()

const date5= new Date();
date5.setDate(date5.getDate()-1)
let day5=date5.toDateString()

const date6= new Date();
date6.setDate(date6.getDate())
let day6=date6.toDateString()


export const UserData = [
    {
      id: 1,
      year: day0,
      userGain: 8,
      userLost: 823,
    },
    {
      id: 2,
      year: day1,
      userGain: 6,
      userLost: 345,
    },
    {
      id: 3,
      year: day2,
      userGain: 8,
      userLost: 555,
    },
    {
      id: 4,
      year: day3,
      userGain: 7,
      userLost: 4555,
    },
    {
      id: 5,
      year: day4,
      userGain: 7,
      userLost: 234,
    },

    {
      id: 6,
      year: day5,
      userGain: 5,
      userLost: 234,
    },

    {
      id: 7,
      year: day6,
      userGain: 6,
      userLost: 234,
    },
  ];