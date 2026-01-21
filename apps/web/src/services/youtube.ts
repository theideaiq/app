export interface YouTubeSnippet {
  title: string;
  description: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
  resourceId: {
    videoId: string;
  };
}

export interface FormattedVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

/**
 * Search YouTube for videos matching a query
 * Now returns a static empty array as the feature is disabled
 */
export async function searchYouTube(_query: string): Promise<FormattedVideo[]> {
  // YOUTUBE_API_KEY removed as per request. Returning empty array.
  return [];
}
