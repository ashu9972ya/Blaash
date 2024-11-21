'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SidebarItem = {
  label: string;
  icon: string;
  link: string;
  content: string;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "Shoppable Video",
    icon: "/Image 2.svg",
    link: "/data1",
    content: "Shoppable Video 1",
  },
  {
    label: "Story",
    icon: "/Image 2.svg",
    link: "/data2",
    content: "Shoppable ",
  },
  {
    label: "Live Commerce",
    icon: "/Image 2.svg",
    link: "/data2",
    content: "Shoppable ",
  },
  {
    label: "Playlist Manager",
    icon: "/Image 2.svg",
    link: "/",
    content: "Product playlist",
  },
];

const CollapsibleGroup = ({
  label,
  icon,
  link,
  content,
  active,
}: SidebarItem & { active: boolean }) => (
  <Collapsible className="group/collapsible" defaultOpen={active} >
    <SidebarGroup>
      <SidebarGroupLabel asChild className="text-white">
        <CollapsibleTrigger >
          <div className="flex gap-x-2 items-center">
            <Image src={icon} alt={label} width={25} height={29} />
            <div
              className={`text-sm font-rubik font-medium ${
                active ? "text-[#FFFFFF]" : "text-[#828293]"
              }`}
            >
              {label}
            </div>
          </div>
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
      </SidebarGroupLabel>
      <CollapsibleContent className="mt-[15px]">
        <SidebarGroupContent className="bg-[#5A5A68] rounded-sm">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="hover:bg-[#5A5A68]">
                <Link href={link}>
                  <span className="text-[#FFFFFF] text-sm font-rubik font-medium">
                    {content}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsibleContent>
    </SidebarGroup>
  </Collapsible>
);

const DesktopNav = () => {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" className="">
      <SidebarTrigger />

      <SidebarHeader className="mt-5 ">
        <Image src="/image 18.svg" alt="" width={90} height={50} />
      </SidebarHeader>
      <SidebarGroup className="mt-[38px] ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={""}>
                <Image src="/category.svg" alt="" width={30} height={30} />
                <span className="text-sm font-rubik font-medium text-[#828293]">
                  Revenue
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      {sidebarItems.map((item, index) => (
        <CollapsibleGroup
          key={index}
          {...item}
          active={pathname === item.link}
        />
      ))}

      <SidebarGroup className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={""}>
                <Image src="/category.svg" alt="" width={30} height={30} />
                <span className="text-sm font-rubik font-medium text-[#828293]">
                  One Click Post
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={""}>
                <Image src="/category.svg" alt="" width={30} height={30} />
                <span className="text-sm font-rubik font-medium text-[#828293]">
                  Calendar
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={""}>
                <Image src="/category.svg" alt="" width={30} height={30} />
                <span className="text-sm font-rubik font-medium text-[#828293]">
                  Hire Influencer
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </Sidebar>
  );
};

export default DesktopNav;
