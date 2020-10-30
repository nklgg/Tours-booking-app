import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (

  <ContentLoader
    speed={2}
    width={300}
    height={550}
    className='card'
    viewBox="0 0 300 550"
    backgroundColor="#e8e8e8"
    foregroundColor="#cccccc"
    {...props}
  >
    <rect x="-11" y="-25" rx="0" ry="0" width="323" height="385" />
    <rect x="20" y="374" rx="5" ry="5" width="259" height="16" />
    <rect x="20" y="409" rx="5" ry="5" width="259" height="16" />
    <rect x="20" y="438" rx="5" ry="5" width="259" height="16" />
    <rect x="20" y="465" rx="5" ry="5" width="259" height="16" />
    <rect x="20" y="497" rx="5" ry="5" width="259" height="16" />
  </ContentLoader>
)

export default MyLoader

// 'e8e8e8'
// cccccc