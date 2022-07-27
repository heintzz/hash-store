import React from 'react'

const Home = ({ children }) => {
    return (
        <div className="bg-slate-100 min-h-screen box-border">
            <div className="max-w-7xl mx-auto flex font-mono px-5">
                {children}
            </div>
        </div>
    )
}

export default Home
