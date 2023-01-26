import React, { useEffect } from 'react'
import { useState } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import Cookies from 'js-cookie';
import { Grid } from '@mui/material';
import axios from 'axios';

const ItemCard = ({ item, startDate, endDate, endTime, startTime }) => {
    const token = Cookies.get('access_token');

    const datatoken = JSON.parse(token)
    const user_id = datatoken._id
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = (quantity, item, user_id, startDate, endDate, endTime, startTime) => {
        // Get the current cart items from local storage
        let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        // Get the item amount
        const itemAmount = item.item_amount;
        // Check if the item is already in the cart
        let itemExists = false;
        for (let i = 0; i < cartItems.length; i++) {
            // if (cartItems[i].item._id === item._id && cartItems[i].user_id === user_id
            //     && cartItems[i].startDate === startDate && cartItems[i].endDate === endDate
            //     ) 

            if (cartItems[i].item._id === item._id && cartItems[i].user_id === user_id
                && JSON.stringify(cartItems[i].startDate) === JSON.stringify(startDate) 
                && JSON.stringify(cartItems[i].endDate) === JSON.stringify(endDate)
                && cartItems[i].startTime === startTime && cartItems[i].endTime === endTime 
            )
           
            
                {
                // Check if the quantity exceeds the item amount
                if (cartItems[i].quantity + quantity > itemAmount) {
                    console.log("Quantity exceeds item amount. Cannot add to cart.");
                    return;
                }
                // cartItems[i].quantity += quantity;
                // cartItems[i] = 
                // { item: {...item}, quantity: cartItems[i].quantity + quantity, user_id: user_id, 
                // startDate: startDate, endDate: endDate };
                cartItems[i].quantity += quantity;
                itemExists = true;
                break;
            }
        }
        // If the item is not already in the cart, add it
        if (!itemExists) {
            // Check if the quantity exceeds the item amount
            if (quantity > itemAmount) {
                console.log("Quantity exceeds item amount. Cannot add to cart.");
                return;
            }
            cartItems.push({ item: item, quantity: quantity, user_id: user_id, 
                startDate: startDate, endDate: endDate, 
            startTime: startTime, endTime: endTime });
        }
        // Save the updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Add item to cart with the selected quantity
        console.log("Adding ", quantity, item.item_name, " to cart")
    }




    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        setQuantity(quantity - 1);
    }

    return (

        <div>

            
                <MDBContainer className="py-5 h-100" >
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol size="12">
                            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }} >
                                <MDBCardBody className="p-0">
                                    <MDBRow className="g-0">
                                        <MDBCol xl="12">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                        {item.item_name}
                                                    </MDBTypography>
                                                    {/* <MDBTypography className="mb-0 text-muted">
                                                        3 items
                                                    </MDBTypography> */}
                                                </div>

                                                <hr className="my-4" />



                                                <MDBRow className="mb-4 d-flex justify-content-between align-items-center" >
                                                    {/* <MDBCol md="2" lg="2" xl="2">
                      <MDBCardImage
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                        fluid className="rounded-3" alt="Cotton T-shirt" />
                    </MDBCol> */}
                                                    <MDBCol md="3" lg="3" xl="3">
                                                        <MDBTypography tag="h6" className="text-muted">

                                                        </MDBTypography>
                                                        <MDBTypography tag="h6" className="text-black mb-0">
                                                            Store : {item.store}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="4" lg="3" xl="4" className="d-flex align-items-center">
                                                        {/* <MDBBtn className="px-2">
                        <MDBIcon fas icon="minus" />
                      </MDBBtn> */}
                                                        <button
                                                            className='btn btn-primary m-2'
                                                            onClick={decrementQuantity}
                                                            disabled={quantity === 0}
                                                        >
                                                            -
                                                        </button>

                                                        <MDBInput type="number" min="0" value={quantity} size="sm" />

                                                        <button
                                                            className='btn btn-primary m-2'
                                                            onClick={incrementQuantity}
                                                            disabled={quantity === item.item_amount}
                                                        >
                                                            +
                                                        </button>

                                                        {/* <MDBBtn className="px-2">
                        <MDBIcon fas icon="plus" />
                      </MDBBtn> */}

                                                    </MDBCol>

                                                    <MDBCol md="3" lg="2" xl="3" className="text-end">
                                                        {/* <MDBTypography tag="h6" className="mb-0">
                                                            € 44.00
                                                        </MDBTypography> */}
                                                        {/* <button className='btn btn-primary' 
                                                        onClick={() => handleAddToCart(quantity, item, user_id, startDate, endDate)}>Add to Cart</button> */}

                                                        <button className='btn btn-primary'
                                                            onClick={() => {
                                                                if (!startDate || !endDate) {
                                                                    console.log("Please select a start and end date.")
                                                                    return;
                                                                }
                                                                handleAddToCart(quantity, item, user_id, startDate, endDate, startTime, endTime)
                                                            }
                                                            }>Add to Cart</button>
                                                    </MDBCol>
                                                    {/* <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                            <a href="#!" className="text-muted">
                                                                <MDBIcon fas icon="trashcan" />
                                                            </a>
                                                        </MDBCol> */}

                                                </MDBRow>


                                            </div>
                                        </MDBCol>

                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
           

        </div>


    )
}

export default ItemCard