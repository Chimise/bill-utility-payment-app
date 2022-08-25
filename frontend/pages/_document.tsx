// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <div id='menu' />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
