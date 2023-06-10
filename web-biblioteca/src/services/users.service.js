import { apiLibrary } from "./index.service"

export const userBorrowed = (borrowedInfo) => {
  return apiLibrary.post('users', borrowedInfo)
}
