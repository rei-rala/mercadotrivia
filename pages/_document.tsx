import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="MercadoTrivia, adivina los precios de los articulos!" />
        <meta name="keywords" content="mercadolibre mercado libre mercadopago mercado pago mercadotrivia meli ml mp metri trivia adivinar juego preguntas" />
        <meta name="theme-color" content="#1a1a1a" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/favicon.ico" />

        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
