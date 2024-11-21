import React from "react";
import PlaylistGrid from "../playlistGrid/PlaylistGrid";
import PlaylistDetails from "../playlistDetails/PlaylistDetails";
import { PlaylistData } from "@/types/youtubePlaylist";

type Video = {
  id: string;
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
};

type Props = {
  playlists: PlaylistData[];
  selectedPlaylist: PlaylistData | null;
  videos: Video[]; // Add the videos prop here
  onThumbnailClick: (clickedPlaylist: PlaylistData) => Promise<void>;
};

const PlaylistManeger = ({
  playlists,
  selectedPlaylist,
  videos,
  onThumbnailClick,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-wrap gap-4 mt-4 lg:flex-nowrap">
      {/* Playlist Grid */}
      <div className="w-full lg:w-2/3">
        <PlaylistGrid
          playlists={playlists}
          onThumbnailClick={onThumbnailClick}
        />
      </div>

      {/* Playlist Details */}
      <div className="w-full lg:w-4/12">
        {selectedPlaylist ? (
          <PlaylistDetails playlist={selectedPlaylist} videos={videos} />
        ) : (
          <div className="flex flex-col gap-y-5 text-white  h-[540px] rounded-[16px] p-[15px] bg-[#27272F] shadow-custom">
            Select a playlist to view details.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistManeger;
