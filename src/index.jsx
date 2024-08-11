import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Auth0Provider
    domain="dev-n1lb40exoxfu2fwu.us.auth0.com"
    clientId="Tud9xiY2TjHj9rXXhAQmaSpJ19xdrWbW"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
)