// import {BrowserRouter, Switch, Route} from 'react-router-dom'
// import {Components} from 'react'
// import Home from './components/Home'
// import Cart from './components/Cart'
// import LoginForm from './components/LoginForm'
// import ProtectedRoute from './components/ProtectedRoute'
// import CartContext from './context/CartContext'

// import './App.css'

// class App extends Components {
//   state = {
//     cartList: [],
//   }

//   removeAllCartItem = () => {
//     this.setState({cartList: []})
//   }

//   removeCartItem = id => {
//     const {cartList} = this.state
//     const filteData = cartList.filter(each => each.dishId !== id)
//     this.setState({cartList: filteData})
//   }

//   addCartItem = item => {
//     this.setState(pre => ({cartList: [...pre.cartList, item]}))
//   }

//   incrementCartItemQuantity = id => {
//     const {cartList} = this.state
//     const updateCartList = cartList.map(each => {
//       if (each.dishId === id) {
//         const newQty = each.quantity + 1
//         return {...each, quantity: newQty}
//       }
//       return each
//     })
//     this.setState({cartList: updateCartList})
//   }

//   decrementCartItemQuantity = id => {
//     const {cartList} = this.state
//     const updateCartList = cartList.map(each => {
//       if (each.dishId === id) {
//         const newQty = each.quantity - 1
//         return {...each, quantity: newQty}
//       }
//       return each
//     })
//     this.setState({cartList: updateCartList})
//   }

//   render() {
//     const {cartList} = this.state
//     return (
//       <CartContext.Provider
//         value={{
//           cartList,
//           addCartItem: this.addCartItem,
//           removeAllCartItem: this.removeAllCartItem,
//           removeCartItem: this.removeCartItem,
//           incrementCartItemQuantity: this.incrementCartItemQuantity,
//           decrementCartItemQuantity: this.decrementCartItemQuantity,
//         }}
//       >
//         <BrowserRouter>
//           <Switch>
//             <Route exact path="/login" component={LoginForm} />
//             <ProtectedRoute exact path="/" component={Home} />
//             <ProtectedRoute exact path="/cart" component={Cart} />
//           </Switch>
//         </BrowserRouter>
//       </CartContext.Provider>
//     )
//   }
// }

// export default App

import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

// write your code here
const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('')

  const addCartItem = dish => {
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (!isAlreadyExists) {
      setCartList(prev => [...prev, dish])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    }
  }

  const removeCartItem = dishId => {
    setCartList(prevState => prevState.filter(item => item.dishId !== dishId))
  }

  const removeAllCartItems = () => setCartList([])

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
        restaurantName,
        setRestaurantName,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
