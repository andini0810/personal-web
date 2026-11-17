import { getFavoriteShows } from "@/lib/tmdb";

export async function GET(request) {
  if (!process.env.TMDB_API_READ_ACCESS_TOKEN) {
    return Response.json(
      { code: "TMDB_TOKEN_MISSING" },
      { status: 503 },
    );
  }

  const requestedLanguage = new URL(request.url).searchParams.get("language");
  const language = requestedLanguage === "id" ? "id" : "en";

  try {
    const movies = await getFavoriteShows(language);
    return Response.json({ movies });
  } catch (error) {
    console.error("TMDB request failed:", error.message);
    return Response.json(
      { code: "TMDB_UNAVAILABLE" },
      { status: 502 },
    );
  }
}
