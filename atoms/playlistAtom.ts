import {atom} from 'recoil'

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '4fNfYYZkz5dgtzmHxgFZXy',
})

export const playlistState = atom({
  key: 'playlistState',
  default: null,
})

export const playlistSongs = atom({
  key: 'playlistSongs',
  default: [],
})