import Lottie from 'lottie-react'

export default function LottiePlayer({ animationData, style = {}, className = '' }) {
  if (!animationData) return null

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ pointerEvents: 'none', ...style }}
      className={className}
    />
  )
}
