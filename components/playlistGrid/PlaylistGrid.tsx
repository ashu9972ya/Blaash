import { PlaylistData } from "@/types/youtubePlaylist";
import Image from "next/image";
import React from "react";



type Props = {
  playlists: PlaylistData[];
  onThumbnailClick: (playlist: PlaylistData) => void;
};

const PlaylistGrid = ({ playlists, onThumbnailClick }: Props) => {
  return (
    <div className="text-white bg-[#27272F] h-[540px] rounded-[16px] p-4 shadow-custom">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {playlists?.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-[#1F1F28] rounded-[25px] relative overflow-hidden cursor-pointer"
            onClick={() => onThumbnailClick(playlist)}
          >
            {/* Playlist Thumbnail */}
            <div className="relative">
              <Image
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-auto object-cover"
                width={241.3}
                height={163.89}
              />
              {/* Top-right Dots */}
              <div className="absolute top-0 right-0 bg-[#27272F] rounded-tr-[25px] rounded-bl-[15px] p-2">
                <Image src="/more.svg" alt="More Options" width={20} height={20} />
              </div>
              {/* Left Icon */}
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <div className="bg-[#017EFA] w-[21px] h-[26px] rounded-tr-[30px] rounded-br-[30px]"></div>
                <h3 className="text-sm font-medium font-rubik text-white">
                  {playlist.title}
                </h3>
              </div>
            </div>

            {/* Playlist Details */}
            <div className="flex items-center justify-center gap-3 my-2">
              <Image src="/subscriptions.svg" alt="Videos Icon" width={17} height={17} />
              <p className="text-sm text-[#FFFFFFCC] font-rubik font-medium">
                {playlist.videos} Videos
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistGrid;
