import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { searchItems } from "services/explorer";

import FloatingButton from "components/FloatingButton/FloatingButton";

const Items: NextPage<any> = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ found: false, message: "" });

  const goBack = () => router.back();

  const handleChange = (e: any) => setQuery(e.target.value);
  const handleSearch = async (e: any) => {
    e.preventDefault();

    if (query.length > 3) {
      Promise.resolve()
        .then(() => setLoading(true))
        .then(() => setResults([]))
        .then(async () => await searchItems(query))
        .then(({ results }) => setResults(results || []))
        .catch(err => setError({ found: true, message: err.message }))
        .finally(() => setLoading(false))
    }
  };

  return (
    <section>
      <Head>
        <title> Explorar items | MercadoTrivia</title>
      </Head>
      <FloatingButton click={goBack}>VOLVER</FloatingButton>

      <header>
        <h2>Busqueda items</h2>
      </header>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ingrese un titulo..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </form>

      <h5>Items</h5>
      {
        loading
          ? <div>Loading...</div>
          : error.found
            ? <div>{error.message}</div>
            : results.length > 0
              ? <ul>
                {
                  results.map((item: any) => (
                    <li key={item.id}>
                      <Link href={`/explorer/items/${item.id}`} passHref>
                        <a>{item.id}</a>
                      </Link>
                      : {item.title} <br />
                      <Image
                        src={item.thumbnail}
                        width={100}
                        height={100}
                        objectFit="contain"
                        alt={item.title}
                      />
                    </li>
                  ))
                }
              </ul>
              : <div>No se encontraron resultados</div>
      }
      <style jsx>{`
        ul {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        li {
          border-bottom: 1px solid red;
        }
      `}</style>
    </section>
  );
};

export default Items;
