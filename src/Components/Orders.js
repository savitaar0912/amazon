import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import '../CSS/Orders.css';
import { selectUserEmail } from '../Store/user/userSlice';
import Order from './Order';

function Orders() {
  const userEmail = useSelector(selectUserEmail);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userEmail) {
      db.collection('users')
        .doc(userEmail)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [userEmail]);

  return (
    <div className="orders">
      <h1>Your Orders:</h1>
      <div className="orders_order">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
