import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext<any | undefined>(undefined)

const setValLocalStorage = (key: any, valueToStore: any) => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    }
  } catch (error) {
    console.log(error)
  }
}

const getValFromLocalStorage = (key: any) => {
  try {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const removeValLocalStorage = (key: any) => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  } catch (error) {
    console.log(error)
  }
}

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Create a provider component
export const ThemeProvider = ({ children }: any) => {
  const [open_api_key, setopen_api_key] = useState('')
  const [ai_model, setai_model] = useState('text-davinci-003')
  const [ai_version, setai_version] = useState('gpt-3.5-turbo')
  const [closechat, setclosechat] = useState(false)
  const [closefolder, setclosefolder] = useState(false)
  const [closeSideBar, setcloseSideBar] = useState(true)
  const [selectedChat, setselectedChat] = useState('')
  const [selectedFolder, setselectedFolder] = useState('')
  const [selectedProfileImage, setselectedProfileImage] = useState('')
  // Function to toggle theme
  const setOpenAiKey = (val: any) => {
    setopen_api_key(val)
    setValLocalStorage('open_api_key_local', val)
  }
  const setModel = (val: any) => {
    setai_model(val)
    setValLocalStorage('ai_model_local', val)
  }
  const setVersion = (val: any) => {
    setai_version(val)

    setValLocalStorage('ai_version_local', val)
  }
  const setChat = (val: any) => {
    setclosechat(val)
    setValLocalStorage('closechat_local', val)
  }
  const setFolder = (val: any) => {
    setclosefolder(val)
    setValLocalStorage('closefolder_local', val)
  }

  const setSideBar = (val: any) => {
    setcloseSideBar(val)
    setValLocalStorage('closesidebar_local', val)
  }
  const folderSelect = (val: any) => {
    setselectedFolder(val)
    setValLocalStorage('folder_select_local', val)
  }
  const chatSelect = (val: any) => {
    setselectedChat(val)
    setValLocalStorage('chat_select_local', val)
  }

  // Retrieve theme from localStorage on component mount
  useEffect(() => {
    const open_api_key = getValFromLocalStorage('open_api_key_local')
    const ai_model = getValFromLocalStorage('ai_model_local')
    const ai_version = getValFromLocalStorage('ai_version_local')
    const closechat = getValFromLocalStorage('closechat_local')
    const closefolder = getValFromLocalStorage('closefolder_local')
    const closeSideBar = getValFromLocalStorage('closesidebar_local')
    const selectedChat = getValFromLocalStorage('chat_select_local')
    const selectedFolder = getValFromLocalStorage('folder_select_local')

    if (open_api_key) {
      setopen_api_key(open_api_key)
    } else {
      setopen_api_key('')
    }
    if (ai_model) {
      setai_model(ai_model)
    } else {
      setai_model('')
    }
    if (ai_version) {
      setai_version(ai_version)
    } else {
      setai_version('')
    }
    if (closechat) {
      setclosechat(closechat)
    } else {
      setclosechat(false)
    }

    if (closefolder) {
      setclosefolder(closefolder)
    } else {
      setclosefolder(false)
    }

    if (closeSideBar) {
      setcloseSideBar(closeSideBar)
    } else {
      setcloseSideBar(false)
    }

    if (selectedChat) {
      setselectedChat(selectedChat)
    } else {
      setselectedChat('')
    }

    if (selectedFolder) {
      setselectedFolder(selectedFolder)
    } else {
      setselectedFolder('')
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        open_api_key,
        ai_model,
        ai_version,
        closechat,
        closefolder,
        closeSideBar,
        selectedChat,
        selectedFolder,
        setOpenAiKey,
        setModel,
        setVersion,
        setChat,
        setFolder,
        setSideBar,
        folderSelect,
        chatSelect,
        selectedProfileImage,
        setselectedProfileImage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
