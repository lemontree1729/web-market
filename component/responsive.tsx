import { useMediaQuery } from 'react-responsive'

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1280 })
    return isDesktop ? children : null
}
export const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ maxWidth: 1279 })
    return isTablet ? children : null
}

export const Moblie = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    return isMobile ? children : null
}
export const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 769 })
    return isNotMobile ? children : null
}