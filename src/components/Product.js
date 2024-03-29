import React, { useContext } from 'react'
import Item from './Item'
import AppContext from '../context/AppContext'
import notFound from '../icons/not-found.svg'
import { useNavigate } from 'react-router-dom'

export default function Product({ keyword }) {
  let navigate = useNavigate()
  const { items, isLogin, addToCart } = useContext(AppContext)
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase()) ||
      item.types.find((type) => type.includes(keyword.toLowerCase()))
  )

  return (
    <div className="flex flex-wrap mt-10">
      {keyword ? (
        filteredItems.length ? (
          filteredItems.map((item) => {
            return (
              <Item
                item={item}
                addToCart={addToCart}
                isLogin={isLogin}
                key={item.id}
              />
            )
          })
        ) : (
          <div className="sm:mx-auto">
            <img
              src={notFound}
              alt="not found"
              className="w-40 mb-10 lg:w-64"
            />
            <div className="mb-5">Item not found...</div>
            <button
              className="bg-red-300 w-fit py-1 px-2 rounded-xl"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>
        )
      ) : (
        items.map((item) => {
          return (
            <Item
              item={item}
              addToCart={addToCart}
              isLogin={isLogin}
              key={item.id}
            />
          )
        })
      )}
    </div>
  )
}
