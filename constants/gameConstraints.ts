export const EXCLUDED_CATEGORIES: { [codigoCategoria: string]: string } = {
  MLA1953: 'Otras categorías',
  MLA1071: 'Animales y Mascotas',
  MLA1540: 'Servicios',
  MLA2547: 'Entradas para Eventos',
  MLA1168: 'Música, Películas y Series',
  MLA1367: 'Antigüedades y Colecciones',
  MLA1368: 'Arte, Librería y Mercería',
  MLA3025: 'Libros, Revistas y Comics'
}

export const EXCLUDED_CATEGORIES_ENTRIES = Object.entries(EXCLUDED_CATEGORIES)
export const EXCLUDED_CATEGORIES_KEYS = Object.keys(EXCLUDED_CATEGORIES)


export const EXCLUDED_PROPERTIES = {
  domain_id: 'MLA-APARTMENTS_FOR_RENT',
}

export const EXCLUDED_PROPERTIES_ENTRIES = Object.entries(EXCLUDED_PROPERTIES)
export const EXCLUDED_PROPERTIES_KEYS = Object.keys(EXCLUDED_PROPERTIES)


export const INCLUDED_PROPERTIES = {
  condition: 'new',
}

export const INCLUDED_PROPERTIES_ENTRIES = Object.entries(INCLUDED_PROPERTIES)
export const INCLUDED_PROPERTIES_KEYS = Object.keys(INCLUDED_PROPERTIES)