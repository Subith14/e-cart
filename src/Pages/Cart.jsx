import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../redux/slice/cartSlice'


function Cart() {
  const cartArray = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()

  const [total,setTotal]=useState(0)
  const navigate = useNavigate()

  const getCartTotal=()=>{
    if(cartArray.length>0){
      setTotal(cartArray.map(item=>item.price).reduce((p1,p2)=>p1+p2))
    }else{
      setTotal(0)
    }
  }
  useEffect(()=>{
    getCartTotal()
  },[cartArray])

  const handlecart=()=>{
    dispatch(emptyCart())
    alert("Order Placed Successfully, Thank you for purchasing")
    navigate('/')
  }
  return (
    <div className='container' style={{marginTop:'100px'}}>
      {
        cartArray.length>0?
        <div className="row mt-5">
          <div className="col-lg-8">
            <table className='table shadow border'>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Product Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                cartArray.map((products,index)=>(
                  <tr key={index}>
                   <td>{index+1}</td>
                   <td>{products.title}</td>
                   <td><img height={'100px'} src={products.thumbnail} alt="" /></td>
                   <td>{products.price}</td>
                   <td><button onClick={()=>dispatch(removeFromCart(products.id))} className='btn'><i className='fa-solid fa-trash text-danger'></i></button></td>
                  </tr>
                ))
              }
            </tbody>
            </table>
          </div>

          <div className='col-lg-1'></div>
           <div className="col-lg-3">
            <div className="border mt-3 rounded shadow p-2 w-100">
              <h2 className="text-primary">Cart Summary</h2>
              <h4 className='mt-3'>Total Products: <span>{cartArray.length}</span></h4>
              <h4 className='mt-3'>Total: <span className='text-danger fw-bolder fs-2'>$ {total}</span></h4>
              <div className="d-grid">
                <button onClick={handlecart} className="btn btn-success mt-5 rounded">Check Out</button>
              </div>
            </div>
           </div>
           
          
        </div>:<div style={{height:'100vh'}} className='w-100 d-flex flex-column justify-content-center align-items-center'>
          <Link  style={{textDecoration:'none'}} className='btn btn-warning rounded mb-5' to={'/'}>Back to home</Link>
          <img height={'500px'} width={'500px'} src="https://bakestudio.in/assets/images/cart/empty-cart.gif" alt="" />
          <h3 className='text-center text-danger mt-3'>Cart Is Empty!!</h3>
          
        </div>
      }
    </div>
  )
}

export default Cart