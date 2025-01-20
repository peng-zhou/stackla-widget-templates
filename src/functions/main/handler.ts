import serverless from "serverless-http"
import expressApp from "../../libs/express"

declare const APP_ENV: string

const requestModifier = async event => {
    // Ensure headers are in array format for Lambda@Edge
    if (event.headers) {
      Object.keys(event.headers).forEach(key => {
        // If the header value is not already an array, convert it into one
        if (!Array.isArray(event.headers[key])) {
          event.headers[key] = [{ key, value: event.headers[key] }]
        }
      })

      console.log("Request headers", event.headers)
    }

    return event
}

const options : Record<string, unknown>= {
  binary: ["image/*"]
}

if (APP_ENV === "production") {
  options.request = requestModifier
}

console.log(APP_ENV);

const main = serverless(expressApp, options);

export { main }
