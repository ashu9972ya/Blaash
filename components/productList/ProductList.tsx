import Image from "next/image";
import React from "react";

type Video = {
  id: string;
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
};

type Props = {
  videos: Video[]; // Accept videos as a prop
};
const ProductList = ({ videos }: Props) => {
  console.log(videos, "ffff");
  return (
    <div className=" flex flex-col gap-[15px] overflow-y-auto">
      <h3 className="font-rubik font-medium text-base">Product List</h3>

      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id} className="border border-solid rounded-[10px] p-[10px] border-[#FFFFFF1A] shadow-custom relative">
            <div className="flex items-center gap-[10px] ">
              <Image
                className="rounded-[12px] w-[63px] h-[63px]"
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                width={63}
                height={63}
              />

              <div className="absolute top-0 right-0 bg-[#35373B] rounded-tr-[10px] rounded-bl-[10px] p-[10px] ">
                <Image src="/Rectangle 281.svg" alt="" width={20} height={20} />
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <div className="font-rubik text-sm font-normal">
                {video.snippet.title}
                </div>
                <span className="bg-[#35373B] w-fit rounded-[10px] py-[3px] px-[5px] font-rubik font-medium text-[11px]">
                  4:05:60
                </span>
                <div className="text-[#C0C0D6] font-rubik font-normal text-sm">
                  Products Attached : 5
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default ProductList;
