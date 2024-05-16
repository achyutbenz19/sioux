import { AnthropicIcon, CohereIcon, GeminiIcon, MistralIcon, OpenAIIcon } from "../components"

export const DOMAIN = process.env.EXPO_PUBLIC_ENV === 'DEVELOPMENT' ?
  process.env.EXPO_PUBLIC_DEV_API_URL :
  process.env.EXPO_PUBLIC_PROD_API_URL

export const MODELS = {
  gpt: { name: 'GPT 4', label: 'gpt', icon: OpenAIIcon },
  gptTurbo: { name: 'GPT Turbo', label: 'gptTurbo', icon: OpenAIIcon },
  claude: { name: 'Claude', label: 'claude', icon: AnthropicIcon },
  claudeInstant: { name: 'Claude Instant', label: 'claudeInstant', icon: AnthropicIcon },
  cohere: { name: 'Cohere', label: 'cohere', icon: CohereIcon },
  cohereWeb: { name: 'Cohere Web', label: 'cohereWeb', icon: CohereIcon },
  mistral: { name: 'Mistral', label: 'mistral', icon: MistralIcon },
  gemini: { name: 'Gemini', label: 'gemini', icon: GeminiIcon },
}

export const IMAGE_MODELS = {
  fastImage: { name: 'Fast Image (LCM)', label: 'fastImage' },
  stableDiffusionXL: { name: 'Stable Diffusion XL', label: 'stableDiffusionXL' },
  removeBg: { name: 'Remove Background', label: 'removeBg' },
  upscale: { name: 'Upscale', label: 'upscale' },
  illusionDiffusion: { name: 'Illusion Diffusion', label: 'illusionDiffusion' },
}

export const ILLUSION_DIFFUSION_IMAGES = {
  tinyCheckers: {
    label: 'tinyCheckers',
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/ultra_checkers.png',
  },
  smallSquares: {
    label: "smallSquares",
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/checkers_mid.jpg'
  },
  mediumSquares: {
    label: "mediumSquares",
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/pattern.png',
  },
  largeSquares: {
    label: 'largeSquares',
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/checkers.png',
  },
  funky: {
    label: 'funky',
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/funky.jpeg',
  },
  stairs: {
    label: 'stairs',
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/cubes.jpeg',
  },
  turkeyFlag: {
    label: 'turkeyFlag',
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/turkey-flag.png'
  },
  indiaFlag: {
    label: 'indiaFlag',
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/india-flag.png'
  },
  usaFlag: {
    label: 'usaFlag',
    image: 'https://storage.googleapis.com/falserverless/illusion-examples/usa-flag.png'
  }
}

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
