import React from 'react'
import { Link } from 'react-router-dom'

export default function Item({ item, addToCart, isLogin }) {
    const { img, title, price, series, id } = item
    return (
        <div className="flex flex-col w-6/12 lg:w-4/12 text-[10px] pr-5 mb-10 sm:text-sm hover:scale-110 transition duration-1000">
            <Link to={`/about/${id}`}>
                <img
                    className="bg-slate-300 rounded-lg mb-3 w-full object-contain h-[180px] sm:h-[280px] md:h-[250px] lg:h-[300px]"
                    src={img}
                    alt={title}
                />
            </Link>
            <div className="mb-2 px-2">
                <h3>{title}</h3>
                <h4 className="text-[10px] sm:text-xs">{series}</h4>
            </div>
            <div className="flex justify-between items-center px-2">
                <p>{`$ ${price}`}</p>
                <Link
                    to={isLogin ? '' : '/login'}
                    onClick={() => addToCart(id)}
                >
                    <img src="./icons/bag-add.svg" className="w-5 sm:w-full" />
                </Link>
            </div>
        </div>
    )
}
