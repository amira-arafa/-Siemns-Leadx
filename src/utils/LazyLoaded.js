import React from 'react';

export const Login = React.lazy(() => import('../containers/Login/Login'));
export const Register = React.lazy(() => import('../containers/Register/Register'));
export const Profile = React.lazy(() => import('../containers/Profile/Profile'));
export const LeadsCreate = React.lazy(() => import('../containers/Leads/LeadsCreate'));
export const LeadsList = React.lazy(() => import('../containers/Leads/LeadsList'));
export const LeadDetails = React.lazy(() => import('../containers/Leads/LeadDetails'));
export const Header = React.lazy(() => import('../containers/Header/Header'));

