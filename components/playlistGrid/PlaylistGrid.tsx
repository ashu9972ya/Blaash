"use client";
import { PlaylistData } from "@/types/youtubePlaylist";
import Image from "next/image";
import React from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {
  playlists: PlaylistData[];
  onThumbnailClick: (playlist: PlaylistData) => void;
  onReorder: (updatedPlaylists: PlaylistData[]) => void; // Callback to handle reordering
};

const DraggablePlaylist = ({
  playlist,
  index,
  movePlaylist,
  onThumbnailClick,
}: {
  playlist: PlaylistData;
  index: number;
  movePlaylist: (fromIndex: number, toIndex: number) => void;
  onThumbnailClick: (playlist: PlaylistData) => void;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "playlist",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "playlist",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        movePlaylist(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      onClick={() => onThumbnailClick(playlist)} // Added the onClick handler
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className={`bg-[#1F1F28] rounded-[25px] relative overflow-hidden cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Playlist Thumbnail */}
      <div className="relative">
        <Image
          src={playlist.thumbnail}
          alt={playlist.title}
          className="h-36 object-cover"
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
        <Image
          src="/subscriptions.svg"
          alt="Videos Icon"
          width={17}
          height={17}
        />
        <p className="text-sm text-[#FFFFFFCC] font-rubik font-medium">
          {playlist.videos} Videos
        </p>
      </div>
    </div>
  );
};

const PlaylistGrid = ({ playlists, onThumbnailClick, onReorder }: Props) => {
  const movePlaylist = (fromIndex: number, toIndex: number) => {
    const updatedPlaylists = [...playlists];
    const [movedPlaylist] = updatedPlaylists.splice(fromIndex, 1);
    updatedPlaylists.splice(toIndex, 0, movedPlaylist);
    onReorder(updatedPlaylists);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="text-white bg-[#27272F] h-[540px] rounded-[16px] p-4 shadow-custom">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {playlists.map((playlist, index) => (
            <DraggablePlaylist
              key={playlist.id}
              playlist={playlist}
              index={index}
              movePlaylist={movePlaylist}
              onThumbnailClick={onThumbnailClick} // Pass the onThumbnailClick callback
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default PlaylistGrid;
