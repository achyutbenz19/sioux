import { createContext } from 'react'
import { ILLUSION_DIFFUSION_IMAGES, IMAGE_MODELS, MODELS } from '../lib/constants'
import { IAppContext, IThemeContext } from '../lib/types'

const ThemeContext = createContext<IThemeContext>({
  theme: {},
  setTheme: () => null,
  themeName: ''
})

const AppContext = createContext<IAppContext>({
  chatType: MODELS.gptTurbo,
  imageModel: IMAGE_MODELS.fastImage.label,
  illusionImage: ILLUSION_DIFFUSION_IMAGES.tinyCheckers.label,
  setChatType: () => null,
  handlePresentModalPress: () => null,
  setImageModel: () => null,
  closeModal: () => null,
  setIllusionImage: () => null
})

export {
  ThemeContext, AppContext
}