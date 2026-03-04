import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import Phone from './phone.svg'
import Instagram from './instagram.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  phone: Phone,
  instagram: Instagram,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (kind === 'mail' && href && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
    return null

  const SocialSvg = components[kind]
  if (!SocialSvg) return null

  const svg = (
    <>
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-600 h-${size} w-${size}`}
      />
    </>
  )

  if (!href) return svg

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {svg}
    </a>
  )
}

export default SocialIcon
