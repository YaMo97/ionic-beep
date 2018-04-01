import { Profile } from "../../models/profile/profile.interface";

const userList: Profile[] = [
    {
        firstName: 'Yatharth',
        lastName: 'Manocha',
        avatar: 'assets/imgs/avatar.png',
        email: 'yathman97@gmail.com',
        dateOfBirth: new Date()
    },
    {
        firstName: 'Anit',
        lastName: 'Singh',
        avatar: 'assets/imgs/avatar.png',
        email: 'anit@gmail.com',
        dateOfBirth: new Date()
    },
    {
        firstName: 'Siddharth',
        lastName: 'Manocha',
        avatar: 'assets/imgs/avatar.png',
        email: 'siddharth@gmail.com',
        dateOfBirth: new Date()
    },
    {
        firstName: 'Udit',
        lastName: 'Nagpal',
        avatar: 'assets/imgs/avatar.png',
        email: 'udit@gmail.com',
        dateOfBirth: new Date()
    }
];

export const USER_LIST = userList;