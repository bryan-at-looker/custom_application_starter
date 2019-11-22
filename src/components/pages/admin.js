import React, {Component} from 'react'
import { Link } from "react-router-dom"

export default function Admin() {
	return (<div>
		<h2>Admin</h2>
		<Link to="/applications/geppettodev" > Go to Home </Link>
		</div>)
	}