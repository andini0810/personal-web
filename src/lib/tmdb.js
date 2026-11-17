const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const FAVORITE_SHOWS = [
  { id: "emily-in-paris", title: "Emily in Paris" },
  { id: "attack-on-titan", title: "Attack on Titan" },
  { id: "when-life-gives-you-tangerines", title: "When Life Gives You Tangerines" },
];

const TMDB_LANGUAGES = {
  en: "en-US",
  id: "id-ID",
};

function normalizeTitle(title) {
  return title.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

async function requestTmdb(path, params) {
  const url = new URL(`${API_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`TMDB returned ${response.status}`);
  }

  return response.json();
}

function findExactShow(results, requestedTitle) {
  const targetTitle = normalizeTitle(requestedTitle);
  return results.find((show) => (
    normalizeTitle(show.name ?? "") === targetTitle
    || normalizeTitle(show.original_name ?? "") === targetTitle
  ));
}

async function getShowDetails(show, language) {
  const search = await requestTmdb("/search/tv", {
    query: show.title,
    language: "en-US",
    include_adult: "false",
    page: "1",
  });
  const match = findExactShow(search.results ?? [], show.title);

  if (!match) {
    return { key: show.id, requestedTitle: show.title, found: false };
  }

  const details = await requestTmdb(`/tv/${match.id}`, {
    language: TMDB_LANGUAGES[language],
  });

  return {
    key: show.id,
    id: details.id,
    requestedTitle: show.title,
    title: details.name || match.name || show.title,
    found: true,
    posterUrl: details.poster_path ? `${IMAGE_BASE_URL}${details.poster_path}` : null,
    overview: details.overview || "",
    year: details.first_air_date?.slice(0, 4) || "",
    rating: details.vote_count > 0 && Number.isFinite(details.vote_average)
      ? details.vote_average.toFixed(1)
      : null,
    genres: Array.isArray(details.genres)
      ? details.genres.map((genre) => genre.name).filter(Boolean)
      : [],
    tmdbUrl: `https://www.themoviedb.org/tv/${details.id}`,
  };
}

export async function getFavoriteShows(language) {
  return Promise.all(FAVORITE_SHOWS.map((show) => getShowDetails(show, language)));
}
