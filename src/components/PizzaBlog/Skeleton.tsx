import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="134" cy="136" r="125" />
        <rect x="0" y="296" rx="10" ry="10" width="280" height="23" />
        <rect x="0" y="345" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="447" rx="10" ry="10" width="95" height="30" />
        <rect x="185" y="449" rx="10" ry="10" width="95" height="30" />
    </ContentLoader>
)

export default Skeleton
