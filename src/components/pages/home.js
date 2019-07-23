import React, {Component} from 'react'
//import ReactDOM from 'react-dom'
import { Link } from "react-router-dom"

export default function Home() {
	return (<div>
		<h2>Home</h2>
		<Link to="/applications/geppettodev/admin" > Go to Admin </Link>
		</div>)
	}