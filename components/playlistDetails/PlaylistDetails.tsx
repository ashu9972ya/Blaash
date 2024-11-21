import React from "react";
import { Checkbox } from "../ui/checkbox";
import ProductList from "../productList/ProductList";
import Image from "next/image";
import { PlaylistData } from "@/types/youtubePlaylist";



type Video = {
  id: string;
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
};

type Props = {
  playlist: PlaylistData ;
  videos: Video[];  // Accept the videos prop here
};


const PlaylistDetails = ({playlist, videos}: Props) => {
  console.log("vvv", playlist)
  return (
    <div className=" flex flex-col gap-y-5 text-white  h-[540px] rounded-[16px] p-[15px] bg-[#27272F] shadow-custom">
      <div className="flex flex-col gap-y-[9px]">
        <h3 className="font-rubik font-medium text-base">{playlist?.title}</h3>

        <div className="rounded-[10px] p-[10px] border border-[#484851] font-rubik font-normal text-sm">
          Get Sporty in Style
        </div>
      </div>
      <div className="flex flex-col gap-y-[9px]">
        <h3 className="font-rubik font-medium text-base">Video status</h3>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label htmlFor="terms2" className="text-sm font-medium font-rubik">
              Active
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label htmlFor="terms2" className="text-sm font-medium font-rubik">
              Active
            </label>
          </div>
        </div>
      </div>
      <ProductList videos={videos}/>
      <div className="flex items-center w-fit mx-auto  justify-center py-[6px] px-[10px] gap-[5px] bg-[#017EFA] border border-[#017EFA] rounded-[10px] ">
        <Image src="/refresh-2.svg" alt="" width={20} height={20} />
        <span className="font-rubik font-medium text-sm">Update Playlist</span>
      </div>
    </div>
  );
};

export default PlaylistDetails;
