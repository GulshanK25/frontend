import baseInstance from './api'
import { resetUser } from './storage'

const userSuffix = '/users'

export const getUserInfo = async userId => {
  try {
    const response = await baseInstance.get(`${userSuffix}/${userId}`)
    return response.data
  } catch (error) {
    if (error.response.status === '401') {
      resetUser()
    }
    console.error('Get Information failed:', error)
  }
}

export const deleteUser = async userId => {
  try {
    const response = await baseInstance.delete(`${userSuffix}/${userId}`)
    return response
  } catch (error) {
    if (error.response.status === '401') {
      resetUser()
    }
    console.error('Get Information failed:', error)
  }
}

export const updateUserInfo = async (userId, data) => {
  try {
    const response = await baseInstance.put(`${userSuffix}/${userId}`, data)
    return response
  } catch (error) {
    console.error('Failed updating user profile:', error)
  }
}

export const getPublicUserInfo = async userId => {
  try {
    const response = await baseInstance.get(`${userSuffix}/public/${userId}`)
    return response.data
  } catch (error) {
    console.error('Get public user failed:', error)
  }
}

export const getUserFollowers = async userId => {
  try {
    const response = await baseInstance.get(`${userSuffix}/${userId}/followers`)
    return response.data
  } catch (error) {
    console.error('Error fetching followers:', error)
  }
}

export const getUserFollows = async userId => {
  try {
    const response = await baseInstance.get(`${userSuffix}/${userId}/follows`)
    return response.data
  } catch (error) {
    console.error('Error fetching follows:', error)
  }
}

export const followUser = async (userId, followeeId) => {
  try {
    const response = await baseInstance.post(`${userSuffix}/${userId}/follow`, {
      followeeId: followeeId,
    })
    return response
  } catch (error) {
    console.error('Error following user:', error)
  }
}

export const unfollowUser = async (userId, followeeId) => {
  try {
    const response = await baseInstance.delete(
      `${userSuffix}/${userId}/unfollow?followeeId=${followeeId}`
    )
    return response
  } catch (error) {
    console.error('Error unfollowing user:', error)
  }
}

export const getUsersByUsername = async query => {
  try {
    const response = await baseInstance.get(
      `${userSuffix}/search/user?username=${query}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getUserFollowsPosts = async userId => {
  try {
    const response = await baseInstance.get(
      `${userSuffix}/${userId}/follows/posts`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching followers:', error)
  }
}
