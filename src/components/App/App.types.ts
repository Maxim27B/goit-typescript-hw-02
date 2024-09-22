export type CurrentPhoto = {
  url: string,
  alt:string,
}

export type Photo = {
    id?: string,
    urls: PhotoUrls,
    small: string,
    alt: string,
    likes: number,
    openModal: () => void,
    setCurrentPhoto: ({ url, alt }: CurrentPhoto) => void,
}

interface PhotoUrls {
  raw: string,
  full: string,
  regular: string,
  small: string,
  thumb: string,
}

export type UserLinks = {
  self: string;
  html: string;
  photos: string;
  likes: string;
}