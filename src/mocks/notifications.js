import { v4 as uuidv4 } from 'uuid'
const notifications = [
  {
    id: uuidv4(),
    title: 'new',
    profilePicture: 'https://picsum.photos/200/300?random=3',
    message: 'Milane Evarola and Mibel Paculanang added to their stories.',
    timeAgo: '2 hours ago',
    isUnread: true,
    icon: 'story'
  },
  {
    id: uuidv4(),
    title: 'new',
    profilePicture: 'https://picsum.photos/200/300?random=17',
    message:
      'Okwechime Cheppok Peter posted in React JS Developers: "I am looking for where to do..."',
    timeAgo: '5 hours ago',
    isUnread: true,
    icon: 'group'
  },
  {
    title: 'new',
    id: uuidv4(),
    profilePicture: 'https://picsum.photos/200/300?random=8',
    message: 'La De Moda Couture Ph and Christine Monteclar posted in Lapu-lapu and Cordova.',
    timeAgo: '20 hours ago',
    isUnread: false,
    icon: 'group'
  },
  {
    title: 'earlier',
    id: uuidv4(),
    profilePicture: 'https://picsum.photos/200/300?random=7',
    message:
      "You've earned a top fan badge for Showbiz Philippines DAILY News and can accept it now.",
    timeAgo: 'a day ago',
    isUnread: true,
    icon: 'badge'
  },
  {
    title: 'earlier',
    id: uuidv4(),
    profilePicture: 'https://picsum.photos/200/300?random=10',
    message: 'Fritzlyn Grace Navarrete and Marvin Calabroso had birthdays yesterday.',
    timeAgo: 'a day ago',
    isUnread: false,
    icon: 'birthday'
  }
]
export default notifications
