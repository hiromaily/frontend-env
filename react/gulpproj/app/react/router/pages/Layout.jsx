import React from "react"
import { Link } from "react-router"

import Footer from "../components/layout/Footer.jsx"
import Nav from "../components/layout/Nav.jsx"

export default class Layout extends React.Component {
  render() {
    const { location } = this.props
    const containerStyle = {
      marginTop: "60px"
    }
    console.log("layout")
    return (
      <div>

        <Nav location={location} />

        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col-lg-12">
              <h1>KillerNews.net</h1>

              {this.props.children}

            </div>
          </div>
          <Footer/>
        </div>
      </div>

    )
  }
}
