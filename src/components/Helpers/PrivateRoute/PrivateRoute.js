import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { AuthUser } from '../AuthUser/AuthUser'
import { Role } from '../AuthUser/Role'

/* It's a function that returns a boolean value. */
const currentUser = AuthUser()
const rolUser = localStorage.getItem("rolUser")

export function PrivateRoute() {
  return currentUser && rolUser === 'Cliente' ? <Outlet /> : <Navigate to="/" />
}

export function PrivateLogin() {
  return rolUser === 'Cliente' || rolUser === 'Admin' || rolUser === 'Veterinary' || rolUser === 'Ipsa'? <Navigate to="/" /> : <Outlet />
}

export function PrivateHome() {
  return rolUser === 'Ipsa' ? <Navigate to="/Admin/Ipsa" /> : <Outlet />
}

export function PrivateAdminRoute() {
  return rolUser === 'Admin' ? <Outlet /> : <Navigate to="/" />
}

export function PrivateVeterinaryRoute() {
  return rolUser === 'Veterinary' ? <Outlet /> : <Navigate to="/" />
}

export function PrivateIpsaRoute() {
  return rolUser === 'Ipsa' ? <Outlet /> : <Navigate to="/Admin/Ipsa" />
}