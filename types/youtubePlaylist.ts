interface YoutubePlaylistListResponse {
    kind: string;
    etag: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: YoutubePlaylistItem[];
  }
  
export   interface YoutubePlaylistItem {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: YoutubeThumbnails;
      channelTitle: string;
      localized: {
        title: string;
        description: string;
      };
    };
  }
  
  interface YoutubeThumbnails {
    default: YoutubeThumbnailDetails;
    medium: YoutubeThumbnailDetails;
    high: YoutubeThumbnailDetails;
    standard?: YoutubeThumbnailDetails; 
    maxres?: YoutubeThumbnailDetails;
  }
  
  interface YoutubeThumbnailDetails {
    url: string;
    width: number;
    height: number;
  }
  




  export interface PlaylistData {
    id: string;
    title: string;
    thumbnail: string;
    videos: number; 
  }