"use client";
import PlaylistManeger from "@/components/playlistManeger/PlaylistManeger";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useApi";
import { PlaylistData, YoutubePlaylistItem } from "@/types/youtubePlaylist";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { debounce } from "lodash";

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

const localPlaylists: PlaylistData[] = [
  {
    id: "local1",
    title: "Local Playlist 1",
    thumbnail: "/image 49.png",
    videos: 5,
  },
  {
    id: "local2",
    title: "Local Playlist 2",
    thumbnail: "/image 49.png",
    videos: 8,
  },
];

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistData | null>(
    null
  );
  const [mergedPlaylists, setMergedPlaylists] = useState<PlaylistData[]>([]); // Move to state

  const [videos, setVideos] = useState<Video[]>([]);
  const { toast } = useToast();

  const { data: playlists, fetchData } = useApi<{
    items: YoutubePlaylistItem[];
  }>(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
    { manual: true }
  );
  console.log("playlists", playlists);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData as Session);
    };
    fetchSession();
  }, []);
  

  const handleFetchPlaylists = () => {
    if (!session?.accessToken) {
      toast({
        variant: "destructive",
        title: "Please Login",
        action: (
          <ToastAction altText="Try again" onClick={() => signIn("google")}>
            Login
          </ToastAction>
        ),
      });
    }

    fetchData({
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
  };

  const handleThumbnailClick = async (playlist: PlaylistData) => {
    setSelectedPlaylist(playlist);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}&maxResults=50`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data: PlaylistItemsResponse = await response.json();
      console.log(data, 'ddsfgdgdg')
      setVideos(data.items || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching playlists",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  const handleReorder = debounce(async (updatedPlaylists: PlaylistData[]) => {
    console.log("Reordered playlists:", updatedPlaylists);
    setMergedPlaylists(updatedPlaylists);
  
    if (!session?.user?.email) {
      toast({
        variant: "destructive",
        title: "Error saving playlist order",
        description: "User email is unavailable. Please log in and try again.",
      });
      return;
    }
  
    try {
      const playlistOrder = updatedPlaylists.map((playlist) => playlist.id);
      await setDoc(
        doc(db, "user_playlists", session.user.email),
        { playlistOrder },
        { merge: true }
      );
      toast({
        variant: "success",
        title: "Playlist order saved",
        description: "Your playlist order has been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving playlist order:", error);
      toast({
        variant: "destructive",
        title: "Error saving playlist order",
        description: "Could not save playlist order to Firebase.",
      });
    }
  }, 500);

  useEffect(() => {
    const playlistsData: PlaylistData[] =
      playlists?.items?.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videos: 10,
      })) || [];

    const merged = [...localPlaylists, ...playlistsData];
    merged.sort((a, b) => b.videos - a.videos);
    setMergedPlaylists(merged);
  }, [playlists]);

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
        playlists={mergedPlaylists}
        onThumbnailClick={handleThumbnailClick}
        selectedPlaylist={selectedPlaylist}
        videos={videos}
        onReorder={handleReorder}
      />
    </>
  );
}
