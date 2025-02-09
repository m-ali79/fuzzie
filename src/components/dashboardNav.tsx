"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";
import {
  MousePointerClick,
  GitBranch,
  Database,
  Moon,
  Sun,
} from "lucide-react";

import ClipBoard from "@/components/icons/clipboard";
import Home from "@/components/icons/home";
import Payment from "@/components/icons/payment";
import Settings from "@/components/icons/settings";
import WorkFlows from "@/components/icons/workflows";
import Templates from "@/components/icons/cloud_download";
import Connections from "@/components/icons/category";

const DashboardNav = () => {
  const pathName = usePathname();
  const { setTheme } = useTheme();

  console.log(pathName);

  const NavLinks = [
    {
      herf: "/dashboard",
      component: <Home selected={pathName === "/dashboard" ? true : false} />,
      toolTip: "Dashboard",
    },
    {
      herf: "/Workflows",
      component: (
        <WorkFlows selected={pathName === "/workflows" ? true : false} />
      ),
      toolTip: "Workflows",
    },
    {
      herf: "/settings",
      component: (
        <Settings selected={pathName === "/settings" ? true : false} />
      ),
      toolTip: "Settings",
    },
    {
      herf: "/connections",
      component: (
        <Connections selected={pathName === "/connections" ? true : false} />
      ),
      toolTip: "Connections",
    },
    {
      herf: "/billing",
      component: <Payment selected={pathName === "/billing" ? true : false} />,
      toolTip: "Billing",
    },
    {
      herf: "/templates",
      component: (
        <Templates selected={pathName === "/templaets" ? true : false} />
      ),
      toolTip: "Templates",
    },
    {
      herf: "/clipboard",
      component: (
        <ClipBoard selected={pathName === "/clipboard" ? true : false} />
      ),
      toolTip: "ClipBoard",
    },
  ];

  return (
    <nav className="h-[100vh] flex flex-col py-3 gap-y-4 items-center justify-between  bg-black w-[4rem]">
      <ul className="flex flex-col gap-y-3 items-center justify-between list-none text-white">
        <h3 className="font-bold">fuzzie.</h3>
        {NavLinks.map((link) => (
          <li key={link.herf}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={link.herf}>{link.component}</Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.toolTip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>

      <div className="w-full h-[1px] bg-gray-600" />

      <div
        className="w-[3rem] h-[12rem] rounded-full bg-red-700 overflow-auto 
                 [&::-webkit-scrollbar]:!hidden ![-ms-overflow-style:none] ![scrollbar-width:none]"
      >
        <div className="flex flex-col items-center justify-start px-2 py-3 space-y-2">
          <div className="w-[2rem] h-[2rem] rounded-full bg-gray-300 flex items-center justify-center">
            <MousePointerClick className="text-white" width={20} height={20} />
          </div>
          <div className="w-[2px] h-[1.5rem] bg-gray-400 self-center" />

          <div className="w-[2rem] h-[2rem] rounded-full bg-gray-300 flex items-center justify-center">
            <GitBranch className="text-white" width={20} height={20} />
          </div>
          <div className="w-[2px] h-[1.5rem] bg-gray-400 self-center" />

          <div className="w-[2rem] h-[2rem] rounded-full bg-gray-300 flex items-center justify-center">
            <Database className="text-white" width={20} height={20} />
          </div>
          <div className="w-[2px] h-[1.5rem] bg-gray-400 self-center" />

          <div className="w-[2rem] h-[2rem] rounded-full bg-gray-300 flex items-center justify-center">
            <GitBranch className="text-white" width={20} height={20} />
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
export default DashboardNav;
