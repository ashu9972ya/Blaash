"use client";
import PlaylistManeger from "@/components/playlistManeger/PlaylistManeger";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { PlaylistData, YoutubePlaylistItem } from "@/types/youtubePlaylist";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
  };
  accessToken: string;
}
interface Video {
  id: string;
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
}

interface PlaylistItemsResponse {
  items: Video[];
}



export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistData | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  const { data: playlists, fetchData } = useApi<{ items: YoutubePlaylistItem[] }>(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=25",
    { manual: true }
  );
  console.log("playlists",playlists)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData as Session);
    };
    fetchSession();
  }, []);

  const handleFetchPlaylists = () => {
    if (!session) return;

    fetchData({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
  };

  const handleThumbnailClick = async (playlist: PlaylistData) => {
    setSelectedPlaylist(playlist);

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}&maxResults=50`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    const data: PlaylistItemsResponse = await response.json();
    setVideos(data.items || []);
  };

  const handleReorder = (updatedPlaylists: PlaylistData[]) => {
    console.log("Reordered playlists:", updatedPlaylists);
    // Update state or perform other actions as needed
  };

  const playlistsData:PlaylistData[] =
    playlists?.items?.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      videos: 10, // Update dynamically as needed
    })) || [];

  return (
    <>
      <div className="flex justify-between items-center mt-[25px]">
        <div className="text-[#FFFFFF] text-base font-rubik font-medium">
          Product Playlists
        </div>
        <Button
          className="bg-[#ed3833] hover:bg-red-400"
          onClick={handleFetchPlaylists}
        >
          <div className="text-[#FFFFFF] font-rubik font-medium text-sm">
            Import Youtube Playlist
          </div>
        </Button>
        <div className="bg-[#017EFA] flex items-center justify-center gap-x-[1.5px] text-[#FFFFFF] py-[6px] px-[10px] rounded-[10px]">
          <Image src="/link.svg" alt="" width={20} height={20} />
          <div className="text-[#FFFFFF] font-rubik font-medium text-sm">
            Generate Code
          </div>
        </div>
      </div>
      <PlaylistManeger
        playlists={playlistsData}
        onThumbnailClick={handleThumbnailClick}
        selectedPlaylist={selectedPlaylist}
        videos={videos}
        onReorder={handleReorder}
      />
    </>
  );
}
