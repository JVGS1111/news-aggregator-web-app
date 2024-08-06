interface Categories {
  tnyt: string
  tg: string
}

interface CategoryMapping {
  [key: string]: Categories
}
export const categoryMapping: CategoryMapping = {
  sports: {
    tnyt: 'Sports',
    tg: 'sport',
  },
  world: {
    tnyt: 'World',
    tg: 'world',
  },
  technology: {
    tnyt: 'Technology',
    tg: 'technology',
  },
  arts: {
    tnyt: 'Arts',
    tg: 'artanddesign',
  },
  books: {
    tnyt: 'Books',
    tg: 'books',
  },
  business: {
    tnyt: 'Business',
    tg: 'business',
  },
  education: {
    tnyt: 'Education',
    tg: 'education',
  },
  food: {
    tnyt: 'Food',
    tg: 'food',
  },
  health: {
    tnyt: 'Health',
    tg: 'healthcare-network',
  },
  movies: {
    tnyt: 'Movies',
    tg: 'film',
  },
  style: {
    tnyt: 'Style',
    tg: 'lifeandstyle',
  },
  music: {
    tnyt: 'Multimedia',
    tg: 'music',
  },
  culture: {
    tnyt: 'Culture',
    tg: 'culture',
  },
}
