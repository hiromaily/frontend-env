import React from 'react'
import $ from 'jquery'

export default class AjaxParent extends React.Component {
  //like getInitialState()
  constructor(props) {
    super(props)
    this.state = {
        count: 0
    }

    this.sendAjax = this.sendAjax.bind(this)
  }

  sendAjax() {
    console.log("sendAjax()")

    let that = this
    let url = 'http://localhost:9999/api/users'
    let method = 'get'
    let hiromaily_header = 'X-Custom-Header-Gin'
    let hiromaily_key = 'key12345'
    let token = 'xxxx'
    //let contentType
    let sendData = ''

    $.ajax({
      url: encodeURI(url),
      type: method,
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader(hiromaily_header, hiromaily_key)
        xhr.setRequestHeader('X-Custom-Header-CORS', 'true')
        //xhr.setRequestHeader('Authorization', token)
      },
      //cache    : false,
      crossDomain: true,
      //contentType: contentType,
      dataType:    'json', //data type from server
      data:        sendData
    }).done(function (data, textStatus, jqXHR) {
      console.log(data)
      //that.setState({ids: data.ids})
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.error(url, textStatus, errorThrown.toString())
    })
    this.setState({
        count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <h4>CORS Test</h4>
        <p>{this.state.count}</p>
        <button onClick={this.sendAjax}>Send Ajax</button>
        <hr/>
      </div>
    )
  }
}
