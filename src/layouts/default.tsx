import * as React from "react"

export const DefaultLayout = (props) => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
      </head>
      <body>
        {props.children}
      </body>
    </html>
  )
}